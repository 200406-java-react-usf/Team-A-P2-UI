import { IState } from "../../reducers";
import { connect } from "react-redux";
import TradeComponent from "./TradeComponent";
import { cargoListAction } from "../../actions/cargo-list-action";
import { tradeAction } from "../../actions/trade-action";

const mapStateToProps = (state: IState) => {
    return {
        authUser: state.login.authUser,
        userCargoList: state.trade.userCargoList,
        errorMessage: state.login.errorMessage
    }
}
const mapDispatchToProps = {
    tradeAction
}


export default connect(mapStateToProps, mapDispatchToProps, null, {pure: false})(TradeComponent);