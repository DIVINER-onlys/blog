export const demoStore = () => {
  const message: any = {
    message1: 'message1',
  }

  return {
    message,

    setMessage(val: Object) {
      this.message = val
    },
  }
}

export type DemoStoreType = ReturnType<typeof demoStore>
