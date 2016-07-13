import React from 'react'
import { Link } from 'react-router'

export default class Step2_info extends React.Component {
  render() {

    return (
        <ul className="step2_info">
            <li className="item">
                <div className="topic">
                    男女胎儿比例为何不是1：1？
                </div>
                <div className="writer">
                    <span>原创</span>
                    <span>撰文 凯特·朗</span>
                </div>
                <div className="introduce">
                    <p>
                        科学家发现，在怀孕的不同阶段，男女胎儿的比例会发生变化。产房里，新生儿是男孩的几率比女孩稍微大一点。在美国，51.3％的活产婴儿是男性，这一比例在过去70年内基本保持不变。专家认为，这种偏向男性的性别比例在受孕时就开始了。
                    </p>
                </div>
                <div className="other">
                    <div className="other_left">2016-03-23  17:09</div>
                    <div className="other_right2">73</div>
                    <div className="other_right1">阅读  10357</div>
                </div>
            </li>
        </ul>
    )
  }
}

