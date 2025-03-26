import { Button, Checkbox, Label, TextInput } from "flowbite-react";


export default function Home() {
  return (
    <main className="grid grid-flow-row justify-center mt-[15rem]">
      <div className="bg-slate-400 min-w-96 p-8 rounded-lg">
        <h1 className="text-3xl">Create Account</h1>
      <form className="flex max-w-md flex-col gap-4">
      <div>
        <div className="mb-2 block">
          <Label htmlFor="email1">Your email</Label>
        </div>
        <TextInput id="email1" type="email" placeholder="name@flowbite.com" required />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password1">Your password</Label>
        </div>
        <TextInput id="password1" type="password" required />
      </div>
      <div className="flex items-center gap-2">
        <Button color="light">Already have an account?</Button>
      </div>
      <Button type="submit">Submit</Button>
    </form>
      </div>

    </main>
  );
}
