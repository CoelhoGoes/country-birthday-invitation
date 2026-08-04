export type RsvpResponseContent = {
  title: string;
  message: string;
  image?: string;
};

export const rsvpResponses: Record<"yes" | "no", RsvpResponseContent> = {
  yes: {
    title: "Yeehaw! 🤠",
    message: "Te vejo no Rodeio!",
    image: "/images/rsvp-yes.jpeg",
  },
  no: {
    title: "Você me odeia? 😢",
    message: "Brincadeiras a parte, obrigado pelo aviso!",
    image: "/images/rsvp-no.jpeg",
  },
};
