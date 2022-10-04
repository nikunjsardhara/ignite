import { useDispatch, useSelector } from "react-redux";
import Content from "../components/Content";
// import { setToggle } from "../slice/creatorSlice";

export default function Home({ data }) {
  return (
    <div>
      <Content data={data} />
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch(
    process.env.NEXT_PUBLIC_BACKEND_URL + "/courses?limit=3"
  );
  const data = await res.json();
  return {
    props: {
      data: data,
    },
  };
}
