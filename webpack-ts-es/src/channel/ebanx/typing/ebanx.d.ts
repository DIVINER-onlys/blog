declare const EBANX: {
  config: {
    setMode: (mode: string) => any
    setPublishableKey: (mode: string) => any
    setCountry: (mode: string) => any
  }
  card: {
    createToken: (
      {
        card_number,
        card_name,
        card_due_date,
        card_cvv,
      }: {
        card_number: string
        card_name: string
        card_due_date: string
        card_cvv: string
      },
      createTokenCallback: any
    ) => any
  }
}
