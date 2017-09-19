import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import LoadingModal from '../common/LldActivityIndicator';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-redux-router';
import * as ContainerActions from '../../actions/container-actions';
import * as CardBindActions from '../../actions/bankcard-action';

class BindedCard extends Component{
  constructor(props) {
    super(props);
    this.actions = bindActionCreators({
      ...ContainerActions,
      ...CardBindActions,

    }, this.props.dispatch);
  }

  onHandlePress(){
    Actions.bindCard();

  }

  componentWillMount() {
    this.actions.showModal(<LoadingModal />);
    this.actions.initCardBind();
  }

  render() {
    let cardNum = '';
    if(this.props.card.userInfo.bankCard){
      cardNum = this.props.card.userInfo.bankCard;
      const cLen = cardNum.length;
      cardNum = cardNum.slice(cLen-4);
    }
    console.log(this.props.card.userInfo);
    return(
      <View>
        <TouchableOpacity onPress={this.onHandlePress} style={styles.cardWrap}>
          <Text style={styles.bankName}>{this.props.card.userInfo.bankName?this.props.card.userInfo.bankName:'银行名称'}</Text><Text style={styles.cardNum}>**** **** **** {cardNum?cardNum: '0000'}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  cardWrap: {
    flexDirection: 'row',
    padding: 20,
    height: 70,
    backgroundColor: '#2d78f4',
    margin: 10,
    borderRadius: 5,
  },
  bankName: {
    flex: 1,
    color: '#fff',
    lineHeight: 30,
  },
  cardNum: {
    flex: 2,
    color: '#fff',
    lineHeight: 30,
  }
});

const mapStateToProps = function (store) {
  return {
    card: store.cardbindState,
  };
};

export default connect(mapStateToProps)(BindedCard);
