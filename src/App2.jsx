import { useState, useEffect, createRef, useRef } from "react";
import GridStack from "gridstack/dist/gridstack-all";
import "./styles.scss";
import "daisyui/dist/full.css";
import "tailwindcss/tailwind.css";

class Media {
  constructor(name, year) {
    this.name = name;
    this.year = year;
  }
  form() {
    const date = new Date();
    return date.getFullYear() - this.year;
  }
  mediaRender() {
    const date = new Date();
    return date.getFullYear() - this.year;
  }
}

function MediaModal({ onSave }) {
  const [isOpen, setIsOpen] = useState(false);

  const [mediaType, setMediaType] = useState("image");
  //const [media, setMedia] = useState(null);

  function handleSave() {
    onSave({
      type: mediaType,
      ...media,
    });
    setIsOpen(false);
  }

  return (
    <div className={`modal ${isOpen ? "modal-open" : ""}`}>
      <div className="modal-box">
        <h3>Select Media</h3>

        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">Image</span>
            <input
              type="radio"
              name="mediaType"
              className="radio checked:bg-primary"
              checked={mediaType === "image"}
              onChange={() => setMediaType("image")}
            />
          </label>

          <label className="label cursor-pointer">
            <span className="label-text">Video</span>
            <input
              type="radio"
              name="mediaType"
              className="radio checked:bg-primary"
              checked={mediaType === "video"}
              onChange={() => setMediaType("video")}
            />
          </label>

          <label className="label cursor-pointer">
            <span className="label-text">Text</span>
            <input
              type="radio"
              name="mediaType"
              className="radio checked:bg-primary"
              checked={mediaType === "text"}
              onChange={() => setMediaType("text")}
            />
          </label>
        </div>

        {/* Media inputs */}

        <div className="modal-action">
          <button className="btn btn-primary" onClick={handleSave}>
            Save
          </button>
          <button className="btn" onClick={() => setIsOpen(false)}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

const AddNewBox = () => {
  return (
    <>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <button
        className="btn"
        onClick={() => document.getElementById("my_modal_2").showModal()}
      >
        open modal
      </button>
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <select
            id="my_select_2"
            defaultValue={"DEFAULT"}
            className="select select-primary w-full max-w-xs"
          >
            <option disabled value="DEFAULT">
              What is the best TV show?
            </option>
            <option>Game of Thrones</option>
            <option>Lost</option>
            <option>Breaking Bad</option>
            <option>Walking Dead</option>
          </select>
          {
            //console.log(document.getElementById('my_select_2'))
          }

          {/*
                    if (document.getElementById('my_select_2').value != "What is the best TV show?") {
                        <p className="py-4">Press ESC key or click outside to close</p>
                    */}
          {/*
                        document.getElementById('my_select_2').value != "What is the best TV show?" ? <p className="py-4">Jijiaste</p> : null
                    */}
          <p className="py-4">Press ESC key or click outside to close</p>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
};

const Item = ({ id }) => <div>{id}</div>;

//
// Controlled example
//
const ControlledStack = ({ items, addItem }) => {
  const refs = useRef({});
  const gridRef = useRef();

  if (Object.keys(refs.current).length !== items.length) {
    items.forEach(({ id }) => {
      refs.current[id] = refs.current[id] || createRef();
    });
  }

  useEffect(() => {
    gridRef.current =
      gridRef.current || GridStack.init({ float: true }, ".controlled");
    const grid = gridRef.current;
    grid.batchUpdate();
    grid.removeAll(false);
    items.forEach(({ id }) => grid.makeWidget(refs.current[id].current));
    grid.batchUpdate(false);
  }, [items]);

  return (
    <div>
      <button onClick={addItem}>Add new widget</button>
      <div className={`grid-stack controlled`}>
        {items.map((item, i) => {
          return (
            <div
              ref={refs.current[item.id]}
              key={item.id}
              className={"grid-stack-item"}
            >
              <div className="grid-stack-item-content">
                <Item {...item} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const ControlledExample = () => {
  const [items, setItems] = useState([{ id: "item-1" }, { id: "item-2" }]);
  return (
    <ControlledStack
      items={items}
      addItem={() => setItems([...items, { id: `item-${items.length + 1}` }])}
    />
  );
};

//
// Uncontrolled example
//
const UncontrolledExample = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [mediaType, setMediaType] = useState("image");

  function handleSave(media) {
    setMedia(media);
  }

  const [media, setMedia] = useState(null);
  /*
    function handleSave() {
        onSave({
            type: mediaType,
            ...media
        });
        setIsOpen(false);
    }*/

  const gridRef = useRef();
  const [state, setState] = useState({
    count: 0,
    info: "",
    items: [
      { x: 2, y: 1, h: 2 },
      { x: 2, y: 4, w: 3 },
      { x: 4, y: 2 },
      { x: 3, y: 1, h: 2 },
      { x: 0, y: 6, w: 2, h: 2 },
    ],
  });

  useEffect(() => {
    gridRef.current =
      gridRef.current ||
      GridStack.init(
        {
          float: true,
          cellHeight: "70px",
          minRow: 1,
        },
        ".uncontrolled",
      );
    const grid = gridRef.current;

    grid.on("dragstop", (event, element) => {
      const node = element.gridstackNode;
      setState((prevState) => ({
        ...prevState,
        info: `you just dragged node #${node.id} to ${node.x},${node.y} – good job!`,
      }));

      let timerId;
      window.clearTimeout(timerId);
      timerId = window.setTimeout(() => {
        setState((prevState) => ({
          ...prevState,
          info: "",
        }));
      }, 2000);
    });
  }, []);

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Add Media</button>

      <MediaModal onSave={handleSave} />

      {media && <div>Media saved: {JSON.stringify(media)}</div>}
      <AddNewBox />

      <button
        onClick={() => {
          const grid = gridRef.current;
          const node = state.items[state.count] || {
            x: Math.round(12 * Math.random()),
            y: Math.round(5 * Math.random()),
            w: Math.round(1 + 3 * Math.random()),
            h: Math.round(1 + 3 * Math.random()),
          };

          // node.mediaType = "yutum"
          // node.mediaContent = "yutum"

          node.id = node.content = String(state.count);

          setState((prevState) => ({
            ...prevState,
            count: prevState.count + 1,
          }));
          grid.addWidget(node);
        }}
      >
        Add Widget
      </button>
      <div>{JSON.stringify(state)}</div>
      <section className="grid-stack uncontrolled"></section>
    </div>
  );
};

// ReactDOM.render(<ControlledExample />, document.getElementById('controlled-stack'))
// ReactDOM.render(<UncontrolledExample />, document.getElementById('uncontrolled-stack'))

export default function App() {
  return (
    <>
      <div>
        <h1>Using GridStack.js with React hooks</h1>
        <p>
          As with any virtual DOM based framework, you need to check if React
          has rendered the DOM (or any updates to it)
          <strong>before</strong> you initialize GridStack or call its methods.
          This example shows how to make rendered components widgets:
        </p>
        <ol>
          <li>Render items, each with a reference</li>
          <li>
            Convert each rendered item to a widget using the reference and the{" "}
            <a href="https://github.com/gridstack/gridstack.js/tree/master/doc#makewidgetel">
              makeWidget()
            </a>{" "}
            function
          </li>
        </ol>
      </div>
      <div>
        <h2>Controlled stack</h2>
        <ControlledExample />
      </div>
      <div>
        <h2>Uncontrolled stack</h2>
        <UncontrolledExample />
      </div>
    </>
  );
}
