/**
 * Created by atilaqi on 10/23/16.
 */
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Dimensions from 'Dimensions';
import AlipaySection from './AlipaySection';
import RepayTabItem from './RepayTabItem';
import SwitchBtn from '../loan/switchBtn';
import LoadingModal from '../common/LldActivityIndicator';
import MessageModal from '../common/MessageModalContainer';
import * as RepayActions from '../../actions/repayment-action';
import * as ContainerActions from '../../actions/container-actions';
import Btn from '../common/LldButton';

class RepaymentContainer extends React.Component {
  constructor(props) {
    super(props)

    this.onPress = this.onPress.bind(this);
    this.onPress2 = this.onPress2.bind(this);
    this.repay = this.repay.bind(this);
    this.getValidateCode = this.getValidateCode.bind(this);
    this.getBankTail = this.getBankTail.bind(this);
    this.showClosePayModal = this.showClosePayModal.bind(this);
  }

  componentWillMount() {
    const { renew } = this.props;
    console.info(renew);
    console.info('-=-=-=-=-=-=-=-=');
    console.info(this.props.repay.switchButton);

    if (renew != this.props.repay.switchButton.repaySpecIndex) {
      this.props.actions.switchButton();
    }
  }

  componentDidMount() {
    this.props.containerActions.showModal(<LoadingModal />);
    this.props.actions.initRepayment();
  }

  onPress() {
    // this.setState({ index: true, repaySpecIndex: 0 });
    this.props.actions.switchButton();
  }

  onPress2() {
    // this.setState({ index: false, repaySpecIndex: 1 });
    this.props.actions.switchButton();
  }

  getValidateCode() {
    this.props.actions.cardBindRepay();
  }

  getBankTail() {
    const bankCard = this.props.repay.bankCard;
    let tail = '';
    if (bankCard)
      tail = bankCard.substr(this.props.repay.bankCard.length - 4, 4);
    return tail;
  }

  showClosePayModal() {
    this.props.actions.showClosePayModal();
  }

  repay(validateCode) {
    const { isCardBound, switchButton } = this.props.repay;
    const isRenew = (switchButton.repaySpecIndex === 1 ? true : false)
    if (isCardBound === 1) {
      this.props.containerActions.showModal(<LoadingModal />);
      this.props.actions.repay(isRenew);
    } else {
      if (!validateCode) {
        this.props.containerActions.showErrModal(<MessageModal errMsg="请先输入验证码" />);
        return false;
      }
      this.props.containerActions.showModal(<LoadingModal />);
      this.props.actions.repayWithCardBound(validateCode, isRenew);
    }
    return true;
  }

  render() {
    const { switchButton, productCode } = this.props.repay;
    return (
      <View style={styles.container}>
        <View style={styles.segCtrl}>
          <View style={{ marginTop: 10, paddingLeft: 35, paddingRight: 35 }}>
            {/*暂停续期功能*/}
            {/*<SwitchBtn press={this.onPress} press2={this.onPress2} index={switchButton.index} name={['还款', '续期']} />*/}
            <View style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              paddingTop: 20,}}>
              <Btn containerStyle={{
                height: 36,
                width: 100,
                backgroundColor: '#1d7cf0',
                borderColor: '#1d7cf0',
                borderWidth: 1,
                marginBottom: 10,
                alignSelf: 'stretch',
                justifyContent: 'center',
                borderRadius: 18,
              }} onPress={function(){}} name="还款" />
            </View>
            {/*暂停续期功能*/}
          </View>
        </View>
        <RepayTabItem
          repaySpec={this.props.repay.repaySpec[switchButton.repaySpecIndex]}
          isRenew={switchButton.repaySpecIndex === 1 ? true : false}
          repay={this.repay}
          isCardBound={this.props.repay.isCardBound}
          isRepayable={this.props.repay.isRepayable}
          bankTail={this.getBankTail()}
          getValidateCode={this.getValidateCode}
          productCode={productCode}
          showClosePayModal={this.showClosePayModal}
          payModalShown={this.props.repay.payModalShown}
        />
        <AlipaySection />
      </View>
    );
  }
}

const styles = StyleSheet.create({

  container: {
    height: Dimensions.get('window').height,
    backgroundColor: '#f2f2f2',
  },
  segCtrl: {
    backgroundColor: 'white',
  },

  text: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '500',
    margin: 10,
  },
});

const mapStateToProps = (state) => (
  {
    repay: state.repayState,
  }
);

const mapDispatchToProps = (dispatch) => (
  {
    actions: bindActionCreators(RepayActions, dispatch),
    containerActions: bindActionCreators(ContainerActions, dispatch),
  }
);

RepaymentContainer.propTypes = {
  containerActions: React.PropTypes.object,
  actions: React.PropTypes.object,
  repaySpec: React.PropTypes.array,
  repay: React.PropTypes.object,
  payModalShown: React.PropTypes.bool,
};

export default connect(mapStateToProps, mapDispatchToProps)(RepaymentContainer);
