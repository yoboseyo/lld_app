/**
 * Created by Administrator on 2016/9/6.
 */
import React, { Component } from 'react';
import {
  Text,
  Picker,
  View,
  StyleSheet,
  PickerIOS,
  TextInput,
  Modal,
  TouchableHighlight,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../../styles/styles';
import LldTextInput from '../common/LldTextInput';

const PickerItemIOS = PickerIOS.Item;

const region = {
  0: ['东城区', '西城区', '海淀区', '朝阳区', '丰台区', '石景山区', '通州区', '顺义区', '房山区', '大兴区', '昌平区', '怀柔区', '平谷区', '门头沟区', '延庆县', '密云县']
  ,
  2: ['河东', '南开', '河西', '河北', '和平', '红桥', '东丽', '津南', '西青', '北辰', '塘沽', '汉沽', '大港', '蓟县', '宝坻', '宁河', '静海', '武清']
  ,
  1: ['浦东新区', '徐汇区', '长宁区', '普陀区', '闸北区', '虹口区', '杨浦区', '黄浦区', '卢湾区', '静安区', '宝山区', '闵行区', '嘉定区', '金山区', '松江区', '青浦区', '南汇区', '奉贤区', '崇明县']
  ,
  3: ['渝中区', '大渡口区', '江北区', '沙坪坝区', '九龙坡区', '南岸区', '北碚区', '万盛区', '双桥区', '渝北区', '巴南区', '万州区', '涪陵区', '黔江区', '长寿区', '江津区', '合川区', '永川区', '南川区', '北部新区', '綦江区', '大足区', '长寿区', '铜梁区', '璧山区', '潼南区', '荣昌区', '黔江区', '梁平县', '城口县', '丰都县', '垫江县', '忠县', '开县', '云阳县', '奉节县', '巫山县', '巫溪县', '武隆县', '石柱土家族自治县', '秀山土家族苗族自治县', '酉阳土家族苗族自治县', '彭水苗族土家族自治县']
  ,
  4: ['杭州', '宁波', '温州', '嘉兴', '湖州', '绍兴', '金华', '衢州', '舟山', '台州', '丽水']
  ,
  5: ['南京', '无锡', '常州', '徐州', '苏州', '南通', '连云港', '淮安', '扬州', '盐城', '镇江', '泰州', '宿迁']
  ,
  6: ['广州', '韶关', '深圳', '珠海', '汕头', '佛山', '江门', '湛江', '茂名', '肇庆', '惠州', '梅州', '汕尾', '河源', '阳江', '清远', '东莞', '中山', '潮州', '揭阳', '云浮']
  ,
  7: ['福州', '厦门', '莆田', '三明', '泉州', '漳州', '南平', '龙岩', '宁德']
  ,
  8: ['长沙', '株洲', '湘潭', '衡阳', '邵阳', '岳阳', '常德', '张家界', '益阳', '郴州', '永州', '怀化', '娄底', '湘西土家苗族自治区']
  ,
  9: ['武汉', '襄阳', '黄石', '十堰', '宜昌', '鄂州', '荆门', '孝感', '荆州', '黄冈', '咸宁', '仙桃', '潜江', '随州', '天门', '恩施', '神农架']
  ,
  10: ['沈阳', '大连', '鞍山', '抚顺', '本溪', '丹东', '锦州', '营口', '阜新', '辽阳', '盘锦', '铁岭', '朝阳', '葫芦岛']
  ,
  11: ['长春', '吉林', '四平', '辽源', '通化', '白山', '松原', '白城', '延边朝鲜族自治州', '吉林省长白山保护开发区', '梅河口', '公主岭']
  ,
  12: ['大庆', '大兴安岭', '黑河', '哈尔滨', '鹤岗', '鸡西', '佳木斯', '牡丹江', '七台河', '齐齐哈尔', '伊春', '双鸭山', '绥化']
  ,
  13: ['石家庄', '保定', '唐山', '邯郸', '承德', '廊坊', '衡水', '秦皇岛', '张家口', '沧州', '邢台']
  ,
  14: ['郑州', '洛阳', '商丘', '安阳', '南阳', '开封', '平顶山', '焦作', '新乡', '鹤壁', '许昌', '漯河', '三门峡', '信阳', '周口', '驻马店', '济源', '濮阳']
  ,
  15: ['济南', '青岛', '菏泽', '淄博', '枣庄', '东营', '烟台', '潍坊', '济宁', '泰安', '威海', '日照', '滨州', '德州', '聊城', '临沂', '莱芜']
  ,
  16: ['西安', '宝鸡', '咸阳', '渭南', '铜川', '延安', '榆林', '汉中', '安康', '商洛']
  ,
  17: ['兰州', '嘉峪关', '金昌', '白银', '天水', '武威', '张掖', '酒泉', '平凉', '庆阳', '定西', '陇南', '临夏', '甘南']
  ,
  18: ['乌鲁木齐', '奎屯', '石河子', '昌吉', '吐鲁番', '库尔勒', '阿克苏', '喀什', '伊宁', '克拉玛依', '塔城', '哈密', '和田', '阿勒泰', '阿图什', '博乐']
  ,
  19: ['西宁', '海东地区', '海北藏族自治州', '黄南藏族自治州', '海南藏族自治州', '果洛藏族自治州', '玉树藏族自治州', '海西蒙古族藏族自治州']
  ,
  20: ['太原', '大同', '阳泉', '长治', '晋城', '朔州', '晋中', '运城', '忻州', '临汾', '吕梁']
  ,
  21: ['成都', '自贡', '攀枝花', '泸州', '德阳', '绵阳', '广元', '遂宁', '内江', '乐山', '南充', '眉山', '宜宾', '广安', '达州', '雅安', '巴中', '资阳', '阿坝藏族羌族自治州', '甘孜藏族自治州', '凉山彝族自治州']
  ,
  22: ['贵阳', '六盘水', '遵义', '安顺', '黔南布依族苗族自治州', '黔西南布依族苗族自治州', '黔东南苗族侗族自治州', '铜仁', '毕节']
  ,
  23: ['合肥', '芜湖', '安庆', '马鞍山', '阜阳', '六安', '滁州', '宿州', '蚌埠', '巢湖', '淮南', '宣城', '亳州', '淮北', '铜陵', '黄山', '池州']
  ,
  24: ['南昌', '九江', '景德镇', '萍乡', '新余', '鹰潭', '赣州', '宜春', '上饶', '吉安', '抚州']
  ,
  25: ['昆明', '曲靖', '玉溪', '保山', '昭通', '丽江', '普洱', '临沧', '楚雄彝族自治州', '大理白族自治州', '红河哈尼族彝族自治州', '文山壮族苗族自治州', '西双版纳傣族自治州', '德宏傣族景颇族自治州', '怒江傈僳族自治州', '迪庆藏族自治州']
  ,
  26: ['呼和浩特', '包头', '乌海', '赤峰', '通辽', '鄂尔多斯', '呼伦贝尔', '巴彦淖尔', '乌兰察布', '兴安盟', '锡林郭勒盟', '阿拉善盟']
  ,
  27: ['拉萨', '昌都地区', '林芝地区', '山南地区', '日喀则地区', '那曲地区', '阿里地区']
  ,
  28: ['南宁', '柳州', '桂林', '梧州', '北海', '防城港', '钦州', , '贵港', '玉林', '百色', '贺州', '河池', '崇左', '来宾']
  ,
  29: ['银川', '石嘴山', '吴忠', '固原', '中卫']
  ,
  30: ['海口', '三亚', '三沙市', '儋州市']
  ,
  31: ['中西区', '湾仔区', '东区', '南区', '九龙城区', '油尖旺区', '观塘区', '黄大仙区', '深水埗区', '北区', '大埔区', '沙田区', '西贡区', '元朗区', '屯门区', '荃湾区', '葵青区', '离岛区']
  ,
  32: ['澳门半岛', '氹仔岛', '路环岛']
  ,
  33: ['台北', '高雄', '基隆', '台中', '台南', '新竹', '嘉义']
};

const province = ['北京', '上海', '天津', '重庆', '浙江',
  '江苏', '广东', '福建', '湖南', '湖北', '辽宁', '吉林', '黑龙江',
  '河北', '河南', '山东', '陕西', '甘肃', '新疆', '青海', '山西',
  '四川', '贵州', '安徽', '江西', '云南', '内蒙古', '西藏', '广西',
  '宁夏', '海南', '香港', '澳门', '台湾'];

class ApplyContacts extends Component {
  constructor(props) {
    super(props)
    this.state = { modelIndex: 0, regionIndex: 0, provinceModal: false };
    this.props.onChangeProvince(province[this.state.modelIndex]);
    this.props.onChangeRegion(region[this.state.modelIndex][this.state.regionIndex]);
    this.provinceVisible = this.provinceVisible.bind(this);
  }
  provinceVisible(bool) {
    this.setState({ provinceModal: bool });
  }
  render() {
    return (
      <View>
        <View style={styles.alignSelf_Center3}><Text style={{ alignSelf: 'center' }}>申请人信息</Text></View>
        <View style={{ padding: 20 }}>
          <View>
            <View><Text>姓名</Text></View>
            <View>
              <LldTextInput
                placeholder="请填写真实姓名"
                isStyles={styles.TextInputStyle2}
                onChangeText={(text) => {
                  this.props.onChangeCustName(text);
                }
                }
              />
            </View>
          </View>
          <View>
            <View><Text>身份证号码</Text></View>
            <View>
              <LldTextInput
                placeholder="请填写15位或18位身份证号码"
                isStyles={styles.TextInputStyle2}
                onChangeText={(text) => {
                  this.setState({ text });
                  this.props.onChangeCardId(text);
                }
                }
              />
            </View>
          </View>
          <View>
            <View><Text>所在地区</Text></View>
            <View style={{ flexDirection: 'row', paddingRight: 5, marginTop: 10, backgroundColor: '#fff', borderColor: '#cccccc', borderWidth: 1 }}>
              <Text onPress={this.provinceVisible} style={{ flex: 1 ,paddingTop: 5, paddingBottom: 5, fontSize: 12 }}>
                {province[this.state.modelIndex]}
                {region[this.state.modelIndex][this.state.regionIndex]}
              </Text>
              <Icon onPress={this.provinceVisible} name='ios-arrow-down' size={25} color="#ccc" style={{alignSelf: 'flex-end' }} />
            </View>
            <View>
              <LldTextInput
                placeholder="请填写家庭住所地址"
                isStyles={styles.TextInputStyle2}
                onChangeText={(text) => {
                  this.setState({ text });
                  this.props.onChangeAddress(text);
                }
                }
              />
            </View>
          </View>
          <View>
            <View><Text>公司名称</Text></View>
            <View>
              <LldTextInput
                placeholder="请填写公司名称"
                isStyles={styles.TextInputStyle2}
                onChangeText={(text) => {
                  this.setState({ text });
                  this.props.onChangeOrgname(text);
                }
                }
              />
            </View>
          </View>
          <View>
            <View><Text>公司地址</Text></View>
            <View>
              <LldTextInput
                placeholder="请填写公司地址"
                isStyles={styles.TextInputStyle2}
                onChangeText={(text) => {
                  this.setState({ text });
                  this.props.onChangeOrgaddress(text);
                }
                }
              />
            </View>
          </View>
          <View>
            <View><Text>手机号码</Text></View>
            <View>
              <TextInput
                placeholder="请填写手机号码"
                value={this.props.mobile}
                style={styles.TextInputStyle2}
                editable={false}
                keyboardType="numeric"
              />
            </View>
          </View>
        </View>
          <Modal
            visible={this.state.provinceModal}
            transparent
            animationType={false}
          >
            <View style={{  borderRadius: 5 ,flex: 1,
              justifyContent: 'flex-end' }}>
              <TouchableHighlight style={{ padding: 10, paddingRight: 10, backgroundColor: 'rgba(170,170,170,1)' }} onPress={() => {this.provinceVisible(false)}}>
                <Text style={{ color: '#fff',  alignSelf: 'flex-end' }}>
                  完成
                </Text>

              </TouchableHighlight>
              <View  style={{ backgroundColor: '#fff', borderRadius: 5,flexDirection:'row' }}>
                <View style={{ flex: 1 }}>
                  <PickerIOS
                    itemStyle={{ fontSize: 16, height: 150 }}
                    selectedValue={this.state.modelIndex}
                    onValueChange={(modelIndex) => {this.setState({modelIndex});
                      this.props.onChangeProvince(province[modelIndex]); }}>
                    {province.map(
                      (modelName, modelIndex) => (
                        <PickerItemIOS
                          key={modelIndex}
                          value={modelIndex}
                          label={modelName}
                        />
                      ))
                    }
                  </PickerIOS>
                </View>
                <View style={{ flex: 1 }}>
                  <PickerIOS
                    itemStyle={{ fontSize: 16, height: 150 }}
                    selectedValue={this.state.regionIndex}
                    onValueChange={(regionIndex) => {this.setState({regionIndex});
                      this.props.onChangeRegion(region[this.state.modelIndex][regionIndex]);}}>
                    {region[this.state.modelIndex].map(
                      (modelName, modelIndex) => (
                        <PickerItemIOS
                          key={modelIndex}
                          value={modelIndex}
                          label={modelName}
                        />
                      ))
                    }
                  </PickerIOS>
                </View>
              </View>
            </View>
          </Modal>
      </View>
    );
  }
}

ApplyContacts.propTypes = {
  onChangeCustName: React.PropTypes.func.isRequired,
  onChangeCardId: React.PropTypes.func.isRequired,
  onChangeAddress: React.PropTypes.func.isRequired,
  onChangeOrgname: React.PropTypes.func.isRequired,
  onChangeOrgaddress: React.PropTypes.func.isRequired,
  onChangeMobile: React.PropTypes.func.isRequired,
  onChangeRegion: React.PropTypes.func.isRequired,
  onChangeProvince: React.PropTypes.func.isRequired,
  mobile: React.PropTypes.string,
};

export default ApplyContacts;