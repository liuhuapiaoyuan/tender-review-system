
import { TenderReview } from '../types/review';

export const mockTenderReview: TenderReview = {
  id: "TR-2024-001",
  title: "北京市政建设工程招标",
  hasRisk: true,
  reviewDate: "2024-07-02 17:01:18",
  totalPoints: 22,
  riskPoints: 5,
  reviewPoints: [
    {
      id: "1",
      title: "招标文件格式要求",
      hasRisk: false,
      children: [
        {
          id: "1.1",
          title: "文件结构完整性",
          hasRisk: false,
          parentId: "1"
        },
        {
          id: "1.2",
          title: "文件编号规范",
          hasRisk: false,
          parentId: "1"
        }
      ]
    },
    {
      id: "2",
      title: "投标资格要求",
      hasRisk: true,
      children: [
        {
          id: "2.1",
          title: "投标人资质要求",
          hasRisk: true,
          parentId: "2"
        },
        {
          id: "2.2",
          title: "业绩要求限制",
          hasRisk: true,
          parentId: "2"
        },
        {
          id: "2.3",
          title: "注册资本要求",
          hasRisk: false,
          parentId: "2"
        }
      ]
    },
    {
      id: "3",
      title: "评标标准",
      hasRisk: true,
      children: [
        {
          id: "3.1",
          title: "评分标准",
          hasRisk: false,
          parentId: "3"
        },
        {
          id: "3.2",
          title: "评标方法",
          hasRisk: true,
          parentId: "3"
        }
      ]
    },
    {
      id: "4",
      title: "合同条款",
      hasRisk: false,
      children: [
        {
          id: "4.1",
          title: "付款条件",
          hasRisk: false,
          parentId: "4"
        },
        {
          id: "4.2",
          title: "质保期规定",
          hasRisk: false,
          parentId: "4"
        }
      ]
    },
    {
      id: "5",
      title: "技术规范",
      hasRisk: true,
      children: [
        {
          id: "5.1",
          title: "技术参数要求",
          hasRisk: true,
          parentId: "5"
        },
        {
          id: "5.2",
          title: "施工标准",
          hasRisk: false,
          parentId: "5"
        }
      ]
    }
  ],
  reviewDetails: {
    "2.1": {
      id: "2.1",
      riskWarning: "文中对投标人在\"北京市单项合同金额在1000万元及以上的已完工的景观绿化工程施工项目业绩至少2项，需提供合同协议书和工程竣工验收登记表。\"对投标人业绩有地域限定的要求，这违反了《招标投标法》中的规定，建议取消。",
      legalBasis: "《招标投标公平竞争审查规则》第二章第六条\"政策制定机关应当全国统一的市场准入条件，对经营主体参与投标活动，不得制定以下政策措施：（三）要求经营主体取得本地区业绩或者奖项。\"",
      recommendation: "建议修改投标人资质要求，删除地域限制条件，允许全国范围内符合条件的投标人参与竞标。"
    },
    "2.2": {
      id: "2.2",
      riskWarning: "招标文件要求投标人必须具备特定的项目经验和规模，可能排除部分有能力但缺乏特定经验的投标人。",
      legalBasis: "《招标投标法实施条例》第二十条规定：\"招标人不得以不合理的条件限制或者排斥潜在投标人，不得对潜在投标人实行歧视待遇。\"",
      recommendation: "放宽业绩要求，增加替代性条件，或允许联合体投标以增加竞争性。"
    },
    "3.2": {
      id: "3.2",
      riskWarning: "评标方法中对某些技术参数的评分过高，且部分参数倾向于特定厂商的技术特点。",
      legalBasis: "《政府采购法》第二十二条：\"采购人或者采购代理机构不得以特定行政区域或者特定行业的业绩、奖项作为加分条件或者中标、成交条件。\"",
      recommendation: "重新设计评分标准，确保各评分项目权重合理，避免对特定厂商形成倾向性。"
    },
    "5.1": {
      id: "5.1",
      riskWarning: "技术规范中的某些参数设置过于精确，与特定品牌产品参数高度吻合，限制了其他品牌参与竞争的可能性。",
      legalBasis: "《政府采购货物和服务招标投标管理办法》第二十条规定：\"采购人根据采购项目的实际情况，可以在招标公告或者资格预审公告中要求投标人提供满足特定条件的业绩案例，但不得违反《政府采购法》第二十二条的规定，不得以特定行政区域或者特定行业的业绩作为加分条件或者中标条件，不得对投标人参与采购活动的其他条件作出限制。\"",
      recommendation: "修改技术参数要求，采用行业通用的性能指标和参数范围，避免使用唯一指向特定产品的参数设置。"
    }
  },
  originalContent: {
    "2.1": {
      id: "2.1",
      content: "三、投标人资格要求\n1.投标人必须是在中华人民共和国境内合法注册并具有独立法人资格的企业；\n2.投标人必须具备市政公用工程施工总承包贰级及以上资质；\n3.投标人须具有北京市单项合同金额在1000万元及以上的已完工的景观绿化工程施工项目业绩至少2项，须提供合同协议书和工程竣工验收登记表；\n4.投标人拟派项目经理须具备市政公用工程专业壹级注册建造师资格和有效的安全生产考核合格证，并在本单位注册（须提供劳动合同和近三个月的社保证明）；\n5.本项目不接受联合体投标。"
    },
    "2.2": {
      id: "2.2",
      content: "四、评分标准\n(一)业绩部分(30分)\n1.投标人近三年(2021年1月1日至今)承担过单项合同金额1000万元及以上的景观绿化工程施工项目业绩,每提供1项得5分,最多得15分。须提供合同协议书、竣工验收证明等有效证明材料，不提供不得分。\n2.投标人获得过省部级及以上工程奖项，每提供1项得5分，最多得15分。须提供获奖证书复印件，不提供不得分。"
    },
    "3.2": {
      id: "3.2",
      content: "五、评标方法\n本项目采用综合评分法，总分100分：\n1.价格部分：30分\n2.商务部分：40分\n3.技术部分：30分\n以评标委员会各成员评分的算术平均值为准。"
    },
    "5.1": {
      id: "5.1",
      content: "六、技术规范要求\n1.灌溉系统控制器：必须采用双核32位CPU，内存容量≥512MB，系统采用Linux操作系统，支持4G/WIFI/有线网络，可实现远程云平台控制。\n2.草坪喷头：必须采用齿轮传动式草坪喷头，喷洒半径8.5m-15.0m可调，工作压力2.0-5.0bar，流量0.34-3.4m³/h，喷头弹出高度≥10cm，喷头外壳材质为ABS工程塑料。\n3.滴灌管：16mm PE管，滴头间距33cm，工作压力1.0bar时流量2.3L/h，抗紫外线，使用寿命≥10年。"
    }
  }
};
