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
      active: '',
      index: 0,
    };
    this.onPress = this.onPress.bind(this);
    this.onNext = this.onNext.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentWillMount() {
    //this.props.loanActions.getMineProducts();
  }
  componentDidMount() {
    this.onPress(this.props.loanState.productSpecs[0].productCode,this.props.loanState.productSpecs);
  }
  onPress(code,productSpecs) {
    this.props.loanActions.selectProduct(code,productSpecs);
    this.setState({ active: code });
  }
  onNext() {
    this.props.containerActions.showModal(<LoadingModal />);
    this.props.loanActions.createLoan();
  }

  render() {
    const { productSpecs, selectedSpec } = this.props.loanState;
    return (
      <View style={styles.container}>
        {
          this.props.loanState.productSpecs.length > 1 ?
            <SwitchBtn press={this.onPress} active={this.state.active} />
            : null
        }
        <ProductIntro productSpec={selectedSpec[0]?selectedSpec[0]:{}} />
        <RepayDetail productSpec={selectedSpec[0]?selectedSpec[0]:{}} onNext={this.onNext} />
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
