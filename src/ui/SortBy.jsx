import { useSearchParams } from "react-router-dom";
import Select from "./Select";

export default function SortBy({ options }) {
  const [urlParams, setUrlParams] = useSearchParams();

  const selectedValue = urlParams.get("sort") || "";

  function handleChange(e) {
    urlParams.set("sort", e.target.value);
    setUrlParams(urlParams);
  }
  return (
    <Select
      options={options}
      onChange={handleChange}
      selectedValue={selectedValue}
    />
  );
}
