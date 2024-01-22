import { useState } from "react";
import { useAuth } from "../../app/store/Auth/AuthContext";

const RegisterForm = () => {
  const { register } = useAuth();

  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const handleRegisterForm1 = async (e: any) => {
    e.preventDefault();

    try {
      await register({
        username,
        firstName,
        lastName,
        email,
        address,
        phoneNumber,
        password,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="max-w-lg mx-auto my-20 bg-white p-8 rounded-xl shadow shadow-slate-300">
        <h1 className="text-4xl font-medium">Register</h1>
        <p className="text-slate-500">Hi, Welcome 👋</p>

        <form onSubmit={handleRegisterForm1} className="my-10">
          <div className="flex flex-col space-y-5">
            <div className="flex space-x-5">
              <label className="flex-1">
                <p className="font-medium text-slate-700 pb-2">First Name</p>
                <input
                  id="firstName"
                  name="firstName"
                  type="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                  placeholder="eg. Haruna A"
                />
              </label>
              <label className="flex-1">
                <p className="font-medium text-slate-700 pb-2">Last Name</p>
                <input
                  id="lastName"
                  name="lastName"
                  type="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                  placeholder="eg. Baldeh"
                />
              </label>
            </div>
            <div className="flex space-x-5">
              <label className="flex-1">
                <p className="font-medium text-slate-700 pb-2">Email</p>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                  placeholder="eg. name@domain.com"
                />
              </label>
              <label className="flex-1">
                <p className="font-medium text-slate-700 pb-2">Address</p>
                <input
                  id="address"
                  name="address"
                  type="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                  placeholder="eg. Sinchu Alagi"
                />
              </label>
            </div>
            <div className="flex space-x-5">
              <label className="flex-1">
                <p className="font-medium text-slate-700 pb-2">Username</p>
                <input
                  id="username"
                  name="username"
                  type="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                  placeholder="eg. john"
                />
              </label>
              <label className="flex-1">
                <p className="font-medium text-slate-700 pb-2">Phone Number</p>
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                  placeholder="eg. 12345"
                />
              </label>
            </div>

            <label>
              <p className="font-medium text-slate-700 pb-2">Password</p>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                placeholder="Enter your password"
              />
            </label>
            <div className="flex flex-row justify-between">
              {/* ... (remember me and forgot password) ... */}
            </div>
            <button
              type="submit"
              className="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                />
              </svg>
              <span>Register</span>
            </button>

          </div>
        </form>
      </div>
    </>
  );
};

export default RegisterForm;
