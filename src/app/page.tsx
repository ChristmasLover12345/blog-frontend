'use client'
import { CreateAccount, login } from "@/utils/DataServices";
import { IToken, IUserInfo } from "@/utils/Interface";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function Home() {
  const[switchBool, setSwitchBool] = useState<boolean>(true)
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  const router = useRouter();

  // This will handle the switch between our login and our create account Logic
  const handleSwitch = () => {
      setSwitchBool(!switchBool)
  }

  const handleSubmit = async () => {

    let userData: IUserInfo = {
      username: username,
      password: password
    }

    console.log(userData)

    if(switchBool)
    {
      // Create account logic here
      let result = await CreateAccount(userData)
      result ? alert("Account Created") : alert("Username already exists")
    }
    else
    {
      // login logic here
      let token: IToken = await login(userData)

      if(token != null)
      {

        if(typeof window != null)
        {
          localStorage.setItem("Token", token.token)
          console.log(token.token)
          router.push('/Dashboard')
        }
      }
      else
      {
        alert("Login was no good wrong password o algo like that")
      }

    }
  }

  
  return (
    <main className="grid grid-flow-row justify-center mt-[15rem]">
      <div className="bg-slate-400 min-w-96 p-8 rounded-lg">
        <h1 className="text-3xl">{switchBool ? 'Create Account' : 'Login'}</h1>
      <form className="flex max-w-md flex-col gap-4">
      <div>
        <div className="mb-2 block">
          <Label htmlFor="username">Your email</Label>
        </div>
        <TextInput id="username" type="email" placeholder="Enter Username" required onChange={(e) => setUsername(e.target.value)}/>
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password1">Your password</Label>
        </div>
        <TextInput id="password1" type="password" required onChange={(e) => setPassword(e.target.value)}/>
      </div>
      <div className="flex items-center gap-2">
        <Button onClick={handleSwitch} color="light">{switchBool ? 'Already have an account?' : 'Click to create an account'}</Button>
      </div>
      <Button onClick={handleSubmit}>Submit</Button>
    </form>
      </div>

    </main>
  );
}
