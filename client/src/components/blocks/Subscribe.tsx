"use client";
import type { SubscribeProps } from "@/types";
import { useActionState } from "react";
import { subscribeAction } from "@/data/actions";

const INITIAL_STATE = {
  zodErrors: null,
  strapiErrors: null,
  errorMessage: null,
  successMessage: null,
};

export function Subscribe({
  headline,
  content,
  placeholder,
  buttonText,
}: Readonly<SubscribeProps>) {

  const [formState, formAction] = useActionState(
    subscribeAction,
    INITIAL_STATE
  )

  console.log(formState, "Our form state")
  const zodErrors = formState.zodErrors?.email
  const strapiErrors = formState?.strapiErrors?.message // formState.strapiErrors

  const errorMessage = strapiErrors || zodErrors || formState.errorMessage
  const successMessage = formState?.successMessage

  return (
    <section className="newsletter container">
      <div className="newsletter__info">
        <h4>{headline}</h4>
        <p className="copy">{content}</p>
      </div>
      <form className="newsletter__form" action={formAction}>
        <input
          name="email"
          type="email"
          placeholder={errorMessage || successMessage || placeholder}
          className={`newsletter__email ${errorMessage ? "newsletter__email--error" : ""}`}
        />
        <button
          type="submit"
          className="newsletter__subscribe btn btn--turquoise btn--medium"
        >
          {buttonText}
        </button>
      </form>
    </section>
  );
}
