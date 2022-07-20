import { useEffect, useState } from "react";
import RingLoader from "react-spinners/RingLoader";

function Loader() {
  let [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 4000);
  }, []);

  return (
    <div>
      <RingLoader color={"D0021B"} loading={loading} size={150} />
    </div>
  );
}

export default Loader;
