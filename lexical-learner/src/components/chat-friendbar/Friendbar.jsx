import './friendbar.css'

const Friendbar = (props) => {

    const isactive = props.name === props.current? 'friendbar-active': '';

    return (
        <div className={`friendbar ${isactive} ${!isactive? 'friendbar-mouseover': ''}`}
            onClick={() => {
                props.setCurrent(props.name)
            }}
            >
            <div className="friendbar-logo">
                {props.logo}
            </div>
            <div className="friendbar-friend">
                <div className="friendbar-friend-name">
                    {props.name}
                </div>
                <div className="friendbar-friend-lastmsg">
                    {props.lastmsg}
                </div>
            </div>
            <div className="friendbar-lastdate">
                {props.lastdate}
            </div>
        </div>
    )
}

export default Friendbar