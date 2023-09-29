import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className={"w3-container"}>
      <h1>Page Not found</h1>
      <p>Here are some helpful links:</p>
      <Link to="/">Home</Link>
    </div>
  );
}
