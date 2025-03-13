import Image from "../../../radiation.png"
interface Props {
    isActive: boolean
}

function XrayIndicatorIndicator({ isActive }: Props) {
    return (
        <>
            {isActive &&
                <img 
                style = {{margin: "0 5px"}}
                src={Image} width="25" height="25" />
            }
        </>
    );
}

export default XrayIndicatorIndicator;