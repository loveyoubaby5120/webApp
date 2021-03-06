import React from 'react'
import { Link } from 'react-router'

export default class Mask extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        show: this.props.show
      };
  }

  onChangeShow(val,event){
    var newState = val;
    this.setState({
      show: newState
    });
    this.props.callbackParent(newState);
  }


  render() {

    return (
      <div className={this.props.show ? "mask block" : "mask"}>
        <div className="instructions">
          <i className="close" onClick={this.onChangeShow.bind(this,false)}>×</i>
            <p className="title">说明</p>
            <ul>
                <li>通过数据抓取技术和合作方提供的数据，我们获得了数百万个公众号的发布频率、文章内容、实时阅读数和实时点赞数。我们采用了这些数据，结合最前沿的数据分析学术研究，对微信公众号在社交网络中的影响力进行了深入、细致和全面的探索，最后进行了分类和排序。在计算影响力的时候，我们主要进行了以下几种分析：</li>
                <li className="label">1，指标预测</li>
                <li>我们利用合作公众号的数据作为训练集，开发出了预测实时转发数和实时粉丝数的模型。并用真实数据对模型的参数进行了校正。我们使用这些指标定量了粉丝活跃度。</li>
                <li className="label">2，账号分类</li>
                <li>根据我们构建的语义库，我们选取单字串和二字串作为特征单元，TF-IDF作为权重计算方法，LibSVM作为分类模型，并最终将所有账号分成十二类，分别为：1、新闻资讯，2、时尚生活，3、娱乐影音，4、旅游美食，5、科技IT，6、汽车，7、房产家居，8、运动健身，9、财经理财，10、休闲娱乐，11、游戏动漫，12、健康生活。</li>
                <li className="label">3、点击和点赞的时间分布</li>
                <li>我们参考并修改了Yasuko Matsubara等人于2012年提出的SPIKEM模型，统计和分析了阅读数和点赞数随时间的分布涨落情况。SPIKEM模型既考虑了阅读数和点赞数在大时间尺度上的幂指数增衰，也考虑了两者随着时间周期自然波动的特征。</li>
                <li>结果显示，即使阅读和点赞总数相同，不同的时间分布也会对影响力产生影响，还会改变未来的传播趋势。因此，我们在榜单的影响力和未来趋势指标中考虑了阅读和点赞的时间分布特征。</li>
                <li className="label">4，公众号文章的文本分析</li>
                <li>我们利用文本分析和情感分析研究了近50个文本特征，包括文章长度，动词密度，标题用词，以及诱导转发的措辞和标记。此外，我们还将公众号文章的词汇和我们的词袋模型进行了比对（约5000个特征）。之前有研究表明，在Twitter上，即使不考虑关注者数量和发帖时间，措辞本身也会对转发数有显著影响。</li>
                <li>我们发现，公众号文章在传播上也有类似的特点。因此，我们通过选取并修正合适的特征组合，为公众号文本的文字措辞进行打分，并将之用于影响力和增长趋势的评估中。</li>

            </ul>
        </div>
      </div>
    )
  }
}

