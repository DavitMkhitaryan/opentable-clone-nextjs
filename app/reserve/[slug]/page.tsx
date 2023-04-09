import NavBar from "../../components/NavBar";
import Header from "./components/Header";
import Form from "./components/Form";

export default function Reserve() {
  return (
    <main className="bg-gray-100 min-h-screen w-screen">
      <div className="max-w-screen-2xl m-auto bg-white">
        {/* NAVBAR */}
        <NavBar />
        {/* NAVBAR END */}
        <div className="border-t h-screen">
          <div className="py-9 w-3/5 m-auto">
            <Header />
            {/* FORM */}
            <Form />
          </div>
        </div>
      </div>
    </main>
  );
}