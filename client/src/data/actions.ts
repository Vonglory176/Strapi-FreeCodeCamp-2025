"use server"; // This is a server action
import { z } from "zod";
import { subscribeService } from "./services";

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
