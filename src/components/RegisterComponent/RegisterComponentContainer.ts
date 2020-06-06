import { IState } from "../../reducers";
import { connect } from "react-redux";
import RegisterComponent from "./RegisterComponent";
import { loginAction } from "../../actions/login-action";

const mapStateToProps = (state: IState) => {
    return {
        authUser: state.login.authUser,
        errorMessage: state.login.errorMessage
    }
}
const mapDispatchToProps = {
    loginAction
}


export default connect(mapStateToProps, mapDispatchToProps, null, {pure: false})(RegisterComponent);