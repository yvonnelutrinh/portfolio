import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <>
      <div>(·.·) This page does not exist! (·.·)</div>
      <Link to="/">Return to home page</Link>
    </>
  );
}