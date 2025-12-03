//import cloneDeep from lodash utility library -- app dependency
import cloneDeep from "lodash/cloneDeep";

// kmToMiles function: convert km to miles
const kmToMiles = (km) => Math.round(km * 0.621371);

// sortMoonsByField function: sort moons by diameter --> Largest to smallest
const sortMoonsByField = (moons = [], field = "", sortOrder = "D") => {
  //deepClone from lodash
  const deepCopyMoons = cloneDeep(moons);

  // passing diameterKM property into the field parameter--on function call--will compare each of the moons diameters
  deepCopyMoons.sort((a, b) => {
    // get values of each moons diameter using field property
    const diameterA = a[field];
    const diameterB = b[field];

    // Return descending if sortOrder is D, or ascending if A, default as descending.
    if (sortOrder === "D") {
      return diameterB - diameterA;
    } else if (sortOrder === "A") {
      return diameterA - diameterB;
    } else {
      return diameterB - diameterA;
    }
  });
  return deepCopyMoons;
};

// ShowJupiterMoon Function: used within the component <ShowJupiterMoons />, returns div--> name of moon, (miles), and an image
const ShowJupiterMoon = (props) => {
  const { name = "", diameterKM = 0, image = "", link = "" } = props.moon;
  if (name.length > 0) {
    return (
      <div>
        <div>
          {name} ({diameterKM > 0 ? `${kmToMiles(diameterKM)} miles` : ""})
        </div>
        <a href={link}>
          <img src={`${process.env.PUBLIC_URL}/images/${image}`} alt={name} width="100" />
        </a>
      </div>
    );
  }
  if (name.length <= 0) {
    return null;
  }
};

// ShowJupiterMoons function: export default for App()
export default function ShowJupiterMoons(props) {
  const { moons = [] } = props;

  const sortedMoons = sortMoonsByField(moons, "diameterKM", "D");

  //Using <ShowJupiterMoon /> component, list(div) each moon using map function on a sorted array of moons.
  return (
    <div>
      {sortedMoons.map((moon, index) => (
        <ShowJupiterMoon key={index} moon={moon} />
      ))}
    </div>
  );
}
