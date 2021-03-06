import { IState } from "../../reducers";
import { connect } from "react-redux";
import CargoHolder from "./CargoHolder";
import { cargoListAction } from "../../actions/cargo-list-action"
const mapStateToProps = (state: IState) => {
    return {
        authUser: state.login.authUser,
        userCargo: state.trade.userCargoList,
        errorMessage: state.login.errorMessage
    }
}
const mapDispatchToProps = {
}


export default connect(mapStateToProps, mapDispatchToProps, null, {pure: false})(CargoHolder);