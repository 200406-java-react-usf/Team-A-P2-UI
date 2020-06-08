import { IState } from "../../reducers";
import { connect } from "react-redux";
import RegisterComponent from "./RegisterComponent";
import { registerAction } from "../../actions/register-action";

const mapStateToProps = (state: IState) => {
    return {
        authUser: state.login.authUser,
        errorMessage: state.login.errorMessage
    }
}
const mapDispatchToProps = {
    registerAction
}


export default connect(mapStateToProps, mapDispatchToProps, null, {pure: false})(RegisterComponent);