export const createPaySession = async (
  userId: string,
  creditAmount: number,
  lang: string,
  priceId: string
) => {
  const res = await fetch("/api/stripe/createSession", {
    method: "POST",
    body: JSON.stringify({
      userId,
      creditAmount,
      priceId,
      origin: window.location.origin, // eg: http://localhost:3000
      lang,
    }),
  });

  const { url } = await res.json();
  console.log("🚀 ~ createSession ~ page - url:", url);
  return url as string;
};
