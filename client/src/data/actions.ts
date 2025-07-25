"use server"; // This is a server action
import { z } from "zod";
import { subscribeService, eventsSubscribeService, type EventsSubscribeProps } from "./services";

const subscribeSchema = z.object({
  email: z.email({
    message: "Please enter a valid email address",
  }),
});

export async function subscribeAction(prevState: any, formData: FormData) {
  console.log("Our first server action");
  const email = formData.get("email");

  const validatedFields = subscribeSchema.safeParse({
    email,
  });

  if (!validatedFields.success) { // Validation error
    console.dir(validatedFields.error.flatten().fieldErrors, { depth: null });

    return {
      ...prevState,
      zodErrors: validatedFields.error.flatten().fieldErrors,
      strapiErrors: null,
    };
  }

  const responseData = await subscribeService(validatedFields.data.email);

  if (!responseData) { // Server error
    return {
      ...prevState,
      zodErrors: null,
      strapiErrors: null,
      errorMessage: "Oops! Something went wrong. Please try again.",
    };
  }

  if (responseData.error) { // Strapi error
    return {
      ...prevState,
      strapiErrors: responseData.error,
      zodErrors: null,
      errorMessage: "Failed to subscribe. Please try again.",
    };
  }

  return { // Success
    ...prevState,
    zodErrors: null,
    strapiErrors: null,
    errorMessage: null,
    successMessage: "You have been subscribed to the newsletter.",
  };
}

const eventsSubscribeSchema = z.object({
    firstName: z.string().min(1, {
      message: "Please enter your first name",
    }),
    lastName: z.string().min(1, {
      message: "Please enter your last name",
    }),
    email: z.email({
      message: "Please enter a valid email address",
    }),
    telephone: z.string()
      .min(1, { message: "Please enter your phone number" })
      .regex(/^(\+\d{1,3}[-.]?)?\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/, {
        message: "Please enter a valid phone number",
      }),
  });
  
  
  export async function eventsSubscribeAction(prevState: any, formData: FormData) {
    const formDataObject = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      telephone: formData.get("telephone"),
      eventId: formData.get("eventId"),
    }
  
    const validatedFields = eventsSubscribeSchema.safeParse(formDataObject);
  
    if (!validatedFields.success) {
      return {
        ...prevState,
        zodErrors: validatedFields.error.flatten().fieldErrors,
        strapiErrors: null,
        formData: {
          ...formDataObject,
        },
      };
    }
  
  
  
    const dataToSend: EventsSubscribeProps = {
      ...validatedFields.data,
      event: {
        connect: [formDataObject.eventId as string],
      },
    };
  
    const responseData = await eventsSubscribeService(dataToSend);
  
    if (!responseData) {
      return {
        ...prevState,
        strapiErrors: null,
        zodErrors: null,
        errorMessage: "Oops! Something went wrong. Please try again.",
      };
    }
  
    if (responseData.error) {
      return {
        ...prevState,
        strapiErrors: responseData.error,
        zodErrors: null,
        formData: {
          ...formDataObject,
        },
        errorMessage: "Failed to Subscribe.",
  
      };
    }
  
    return {
      ...prevState,
      zodErrors: null,
      strapiErrors: null,
      errorMessage: null,
      formData: null,
      successMessage: "Successfully Subscribed!",
    };
  }