import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Dimensions from 'Dimensions';
import ProductIntro from './productIntro';
import RepayDetail from './repayDetail';
import SwitchBtn from './switchBtn';
import * as LoanActions from '../../actions/loan-actions';
import * as ContainerActions from '../../actions/container-actions';
import LoadingModal from '../common/LldActivityIndicator';

class Loan extends Component {
  constructor(props) {
    super(props)
    this.state = {
      index: true,
      btn: true,
    };
    this.onPress = this.onPress.bind(this);
    this.onPress2 = this.onPress2.bind(this);
    this.onNext = this.onNext.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }
  componentDidMount() {

    this.onPress();
  }
  onPress() {
    this.props.loanActions.selectProduct('1000s');
    this.setState({ index: true });
  }
  onPress2() {
    this.props.loanActions.selectProduct('2000d');
    this.setState({ index: false });
  }
  onNext() {
    this.props.containerActions.showModal(<LoadingModal />);
    this.props.loanActions.createLoan();
  }

  render() {
    const { productSpecs } = this.props.loanState;
    const { length = 0 } = this.props.loanState.productSpecs.length;
    return (
      <View style={styles.container}>
        {
          length > 1 ?
            <SwitchBtn press={this.onPress} press2={this.onPress2} index={this.state.index} name={['1000', '2000']} />
            : null
        }
        <ProductIntro productSpec={productSpecs[1]?productSpecs[1]:productSpecs} />
        <RepayDetail productSpec={productSpecs[1]?productSpecs[1]:productSpecs} onNext={this.onNext} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   // marginTop: 20,
    height: Dimensions.get('window').height,
    backgroundColor: '#f2f1f1',
  },

});

const mapStateToProps = (state) => ({
  userState: state.userState,
  loanState: state.loanState,
});

const mapDispatchToProps = (dispatch) => ({
  loanActions: bindActionCreators(LoanActions, dispatch),
  containerActions: bindActionCreators(ContainerActions,dispatch),
});

Loan.propTypes = {
  loanActions: React.PropTypes.objectOf(React.PropTypes.func),
  containerActions: React.PropTypes.objectOf(React.PropTypes.func),
  loanState: React.PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(Loan);
