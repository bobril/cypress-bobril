import * as b from "bobril";

let visible = false;
let visible2 = false;
let changedLabel = false;

b.init(() => (
    <>
        <MyButton key="my-button" label={changedLabel ? "New Button" : "Component Button"} />
        <button
            key="button1"
            onClick={() =>
                window.setTimeout(() => {
                    visible = true;
                    changedLabel = true;
                    b.invalidate();
                }, 15000)
            }
        >
            TEST 1
        </button>
        {visible ? (
            <button
                id="button2"
                key="button2"
                onClick={() =>
                    window.setTimeout(() => {
                        visible2 = true;
                        b.invalidate();
                    }, 15000)
                }
            >
                TEST 2
            </button>
        ) : (
            <></>
        )}
        {visible2 ? <button key="button3">TEST 3</button> : <></>}
    </>
));

class MyButton extends b.Component<{ label: string }> {
    static id: string = "my-button-id";
    render(): b.IBobrilNode {
        return <button>{this.data.label}</button>;
    }
}
