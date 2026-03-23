import Preview from "./Preview";
import Controls from "./Controls";

export default function Editor({ image, setImage }) {
  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 grid md:grid-cols-2 gap-6">
      <Preview image={image} setImage={setImage} />
      <Controls />
    </div>
  );
}