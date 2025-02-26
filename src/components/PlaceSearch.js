import React from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { Select } from "antd";

const { Option } = Select;

function PlaceSearch(props) {
  const { place, setPlace, getPlace } = props;
  const {
    ready,
    suggestions: { status, data },
    setValue,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: {
        lat: () => 13.7563,
        lng: () => 100.5018,
      },
      radius: 200 * 1000,
    },
  });

  function onSearch(val) {
    setValue(val);
  }

  return (
    <Select
      showSearch
      className="route__input"
      placeholder={place}
      notFoundContent={null}
      // value={value}
      onSelect={async (address) => {
        setPlace(address);
        setValue(address, false);
        try {
          const results = await getGeocode({ address });
          console.log(results);
          const { lat, lng } = await getLatLng(results[0]);
          getPlace({ lat, lng });
        } catch (err) {
          console.log(err);
        }
      }}
      onSearch={onSearch}
      disabled={!ready}
    >
      {status === "OK" &&
        data.map(({ id, description }, i) => {
          return (
            <Option key={i} value={description}>
              {description}
            </Option>
          );
        })}
    </Select>
  );
}

export default PlaceSearch;
