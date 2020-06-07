import { IState } from "../../reducers";
import { connect } from "react-redux";
import AdminComponent from "./AdminComponent";

const mapStateToProps = (state: IState) => {
    return {
        authUser: state.login.authUser,
        errorMessage: state.login.errorMessage
    }
}
const mapDispatchToProps = {
    
}


export default connect(mapStateToProps, mapDispatchToProps, null, {pure: false})(AdminComponent);