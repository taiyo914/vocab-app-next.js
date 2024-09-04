import { login, signup } from "./actions";

export default function LoginPage() {
  return (
    <form className="flex flex-col justify-center items-center w-full h-screen">
      <div className="border rounded-xl p-3 ">
        <label htmlFor="email">Email:</label>
        <br/>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="border mb-2"
        />
        <br />
        <label htmlFor="password" >Password:</label>
        <br />
        <input
          id="password"
          name="password"
          type="password"
          required
          className="border mb-2"
        />
      <div className="space-x-2 mt-2 flex justify-center">
        <button
          formAction={login}
          className="rounded-lg bg-blue-500 text-white p-2 w-full hover:opacity-80 transition-all"
        >
          Log in
        </button>
        <button
          formAction={signup}
          className="rounded-lg bg-blue-500 text-white p-2 w-full hover:opacity-80 transition-all"
        >
          Sign up
        </button>
      </div>
    </div>
    </form>
  );
}
