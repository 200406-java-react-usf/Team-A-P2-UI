import { IState } from "../../reducers";
import { connect } from "react-redux";
import UserHolder from "./UserHolder";

const mapStateToProps = (state: IState) => {
    return {
        authUser: state.login.authUser,
        errorMessage: state.login.errorMessage
    }
}
const mapDispatchToProps = {
    
}


export default connect(mapStateToProps, mapDispatchToProps, null, {pure: false})(UserHolder);