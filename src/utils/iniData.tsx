import { AssociationData } from "../datas4graph/AssociationData"
import { DistributionData } from "../datas4graph/DistributionData"
import { ProportionData } from "../datas4graph/ProportionData"
import { Category11 } from "../datas4graph/CategoryData"
import { Card, cateAndValue } from "../types"
import { TrendData11 } from "../datas4graph/TrendData"
import { PeriodicityData } from "../datas4graph/PeriodicityData"
import { AnomalyData } from "../datas4graph/AnomalyData"
import { DifferenceData } from "../datas4graph/DifferenceData"

export const iniData: Card[] = [
  {
    CardName: "Card1",
    paragraph: [
      {
        type: "topic",
        phrases: [
          { type: "CardTitle", value: "Difference" },
          { type: "text", value: " Difference of Total " },
          {
            type: "entity",
            value: "Profit",
            metadata: { entityType: "metric_names" },
          },
          { type: "text", value: " by " },
          {
            type: "entity",
            value: "Year",
            metadata: { entityType: "metric_names" },
          },
        ],
      },
      {
        type: "normal",
        phrases: [
          { type: "IconPadding", value: "", metadata: { entityType: "sentenceStart" } },
          { type: "text", value: "From " },
          {
            type: "entity",
            value: "2012.01.01",
            metadata: { entityType: "filter_time", selections: ["2012-01-01"], paramIndex: 2 },
          },
          { type: "text", value: " to " },
          {
            type: "entity",
            value: "2012.12.31",
            metadata: { entityType: "filter_time", selections: ["2012-12-31"], paramIndex: 3 },
          },
          { type: "text", value: ", total " },
          {
            type: "entity",
            value: "profit ",
            metadata: { entityType: "metric_names", interactionType: "y-axis" },
          },
          {
            type: "entity",
            value: "increased ",
            metadata: { entityType: "binary_value_positive", assessment: "increase" },
          },
          { type: "text", value: "by " },
          {
            type: "entity",
            value: "23.49% ",
            metadata: { entityType: "binary_value_positive", assessment: "positive" },
          },
          {
            type: "entity",
            value: "(248940.81 → 307415) ",
            metadata: {
              entityType: "insight",
              insightType: "TemporalDifference",
              detail: DifferenceData.data,
              tagData: DifferenceData.tagData,
            },
          },
          { type: "text", value: "from " },
          {
            type: "entity",
            value: "2011-01-01",
            metadata: { entityType: "filter_time", selections: ["2011-01-01"], paramIndex: 0 },
          },
          { type: "text", value: " to " },
          {
            type: "entity",
            value: "2011-12-31",
            metadata: { entityType: "filter_time", selections: ["2011-12-31"], paramIndex: 1 },
          },
          { type: "IconPadding", value: "", metadata: { entityType: "sentenceEnd" } },
        ],
      },

      {
        type: "plot",
        chartType: "TemporalDifference",
        metadata: {
          detail: DifferenceData.data,
          tagData: DifferenceData.tagData,
        },
      },
      {
        type: "configuration",
        chartType: "TemporalDifference",
        metadata: {
          timeSelection: ["2011-01-01", "2011-12-31", "2012-01-01", "2012-12-31"],
        },
      },
    ],
  },
  {
    CardName: "Card2",
    paragraph: [
      {
        type: "topic",
        phrases: [
          // { type: "IconPadding", value: "", metadata: { entityType: "sentenceStart" } },
          { type: "CardTitle", value: "Categorization" },
          { type: "text", value: " Rank of " },
          {
            type: "entity",
            value: "Sales",
            metadata: { entityType: "metric_names", interactionType: "y-axis" },
          },
          { type: "text", value: " by " },
          {
            type: "entity",
            value: "City",
            metadata: { entityType: "metric_names", interactionType: "x-axis" },
          },
          // { type: "IconPadding", value: "", metadata: { entityType: "sentenceEnd" } },
        ],
      },
      {
        type: "normal",
        phrases: [
          { type: "IconPadding", value: "", metadata: { entityType: "sentenceStart" } },
          { type: "text", value: "When looking at " },
          {
            type: "entity",
            value: "sales",
            metadata: { entityType: "metric_names", interactionType: "y-axis" },
          },
          { type: "text", value: " by " },
          {
            type: "entity",
            value: "City",
            metadata: {
              entityType: "filter_cate",
              selections: ["City", "Market", "Country"],
              interactionType: "x-axis",
              backEndType: "drillDownGroup",
            },
          },
          { type: "text", value: ", there are " },
          {
            type: "entity",
            value: "7 ",
            metadata: { entityType: "metric_value", origin: 7 },
          },
          {
            type: "entity",
            value: "categories",
            metadata: {
              entityType: "insight",
              insightType: "Categorization",
              detail: Category11.data,
              tagData: -1,
            },
          },
          { type: "text", value: ", and the top " },
          {
            type: "entity",
            value: "3",
            metadata: {
              entityType: "filter_cate",
              selections: ["3", "4", "5"],
              interactionType: "multiHighlight",
              backEndType: "topK",
            },
          },
          { type: "text", value: " categories are:" },
          { type: "IconPadding", value: "", metadata: { entityType: "sentenceEnd" } },
        ],
      },
      {
        type: "bullet",
        show: "yes",
        phrases: [
          { type: "IconPadding", value: "", metadata: { entityType: "sentenceStart" } },
          {
            type: "entity",
            value: "New York City",
            metadata: { entityType: "metric_names", interactionType: "ByValue" },
          },
          {
            type: "text",
            value: ": ",
          },
          // {
          //   type: 'entity',
          //   value: '256368.16',
          //   metadata: { entityType: 'metric_value', origin: 256368.16 },
          // },
          {
            type: "entity",
            value: "256368.16",
            metadata: {
              entityType: "metric_value",
              insightType: "Categorization",
              detail: Category11.data,
              tagData: 0, // 标记第几个数据高亮
              origin: 256368.161,
              interactionType: "ByValue",
            },
          },
          { type: "IconPadding", value: "", metadata: { entityType: "sentenceEnd" } },
        ],
      },
      {
        type: "bullet",
        show: "yes",
        phrases: [
          { type: "IconPadding", value: "", metadata: { entityType: "sentenceStart" } },
          {
            type: "entity",
            value: "Los Angeles",
            metadata: { entityType: "metric_names", interactionType: "ByValue" },
          },
          {
            type: "text",
            value: ": ",
          },
          // {
          //   type: 'entity',
          //   value: '175851.34',
          //   metadata: { entityType: 'metric_value', origin: 175851.34 },
          // },
          {
            type: "entity",
            value: "175851.34",
            metadata: {
              entityType: "metric_value",
              insightType: "Categorization",
              detail: Category11.data,
              tagData: 1, // 标记第几个数据高亮
              origin: 175851.34,
              interactionType: "ByValue",
            },
          },
          { type: "IconPadding", value: "", metadata: { entityType: "sentenceEnd" } },
        ],
      },
      {
        type: "bullet",
        show: "yes",
        phrases: [
          { type: "IconPadding", value: "", metadata: { entityType: "sentenceStart" } },
          {
            type: "entity",
            value: "Manila",
            metadata: { entityType: "metric_names", interactionType: "ByValue" },
          },
          {
            type: "text",
            value: ": ",
          },
          // {
          //   type: 'entity',
          //   value: '120886.95',
          //   metadata: { entityType: 'metric_value', origin: 120886.95 },
          // },
          {
            type: "entity",
            value: "120886.95",
            metadata: {
              entityType: "metric_value",
              insightType: "Categorization",
              detail: Category11.data,
              tagData: 2, // 标记第几个数据高亮
              origin: 120886.95,
              interactionType: "ByValue",
            },
          },
          { type: "IconPadding", value: "", metadata: { entityType: "sentenceEnd" } },
        ],
      },
      {
        type: "bullet",
        show: "no",
        phrases: [
          { type: "IconPadding", value: "", metadata: { entityType: "sentenceStart" } },
          {
            type: "entity",
            value: "Seattle",
            metadata: { entityType: "metric_names", interactionType: "ByValue" },
          },
          {
            type: "text",
            value: ": ",
          },
          // {
          //   type: 'entity',
          //   value: '120886.95',
          //   metadata: { entityType: 'metric_value', origin: 120886.95 },
          // },
          {
            type: "entity",
            value: "119540.742",
            metadata: {
              entityType: "metric_value",
              insightType: "Categorization",
              detail: Category11.data,
              tagData: 3, // 标记第几个数据高亮
              origin: 119540.742,
              interactionType: "ByValue",
            },
          },
          { type: "IconPadding", value: "", metadata: { entityType: "sentenceEnd" } },
        ],
      },
      {
        type: "bullet",
        show: "no",
        phrases: [
          { type: "IconPadding", value: "", metadata: { entityType: "sentenceStart" } },
          {
            type: "entity",
            value: "San Francisco",
            metadata: { entityType: "metric_names", interactionType: "ByValue" },
          },
          {
            type: "text",
            value: ": ",
          },
          // {
          //   type: 'entity',
          //   value: '120886.95',
          //   metadata: { entityType: 'metric_value', origin: 120886.95 },
          // },
          {
            type: "entity",
            value: "112669.092",
            metadata: {
              entityType: "metric_value",
              insightType: "Categorization",
              detail: Category11.data,
              tagData: 4, // 标记第几个数据高亮
              origin: 119540.742,
              interactionType: "ByValue",
            },
          },
          { type: "IconPadding", value: "", metadata: { entityType: "sentenceEnd" } },
        ],
      },
      {
        type: "plot",
        chartType: "Categorization",
        metadata: {
          detail: Category11.data,
        },
      },
      {
        type: "configuration",
        chartType: "Categorization",
        metadata: {
          drillDownGroup: "City",
          topK: "3",
        },
      },
    ],
  },
  {
    CardName: "Card3",
    paragraph: [
      {
        type: "topic",
        phrases: [
          { type: "CardTitle", value: "Proportion" },
          { type: "text", value: " Proportion of " },
          {
            type: "entity",
            value: "Sales",
            metadata: { entityType: "metric_names" },
          },
          { type: "text", value: " by " },
          {
            type: "entity",
            value: "Country",
            metadata: { entityType: "metric_names" },
          },
        ],
      },
      {
        type: "normal",
        phrases: [
          { type: "IconPadding", value: "", metadata: { entityType: "sentenceStart" } },

          { type: "text", value: "From " },
          {
            type: "entity",
            value: "January 1, 2011",
            metadata: { entityType: "filter_time", selections: ["2011-01-01"], paramIndex: 0 },
          },
          { type: "text", value: " to " },
          {
            type: "entity",
            value: "December 31, 2014",
            metadata: { entityType: "filter_time", selections: ["2014-12-31"], paramIndex: 1 },
          },
          {
            type: "text",
            value: ", when drilling down by ",
          },
          {
            type: "entity",
            value: "Country",
            metadata: {
              entityType: "filter_cate",
              selections: ["Country", "City", "Market"],
              backEndType: "drillDownGroup",
            },
          },
          {
            type: "text",
            value: ", the specific proportions of total ",
          },
          {
            type: "entity",
            value: "sales",
            metadata: { entityType: "metric_names" },
          },
          {
            type: "text",
            value: " volume are as follows:",
          },
          { type: "IconPadding", value: "", metadata: { entityType: "sentenceEnd" } },
        ],
      },
      {
        type: "bullet",
        phrases: [
          { type: "IconPadding", value: "", metadata: { entityType: "sentenceStart" } },

          {
            type: "entity",
            value: "United States",
            metadata: { entityType: "metric_names" },
          },
          {
            type: "text",
            value: " ranks first, with a proportion of ",
          },

          {
            type: "entity",
            value: "18.17%",
            metadata: {
              entityType: "metric_value",
              insightType: "Proportion",
              origin: 0.1817,
              detail: [0.1817, 1 - 0.1817],
            },
          },

          { type: "IconPadding", value: "", metadata: { entityType: "sentenceEnd" } },
        ],
      },
      {
        type: "bullet",
        phrases: [
          { type: "IconPadding", value: "", metadata: { entityType: "sentenceStart" } },

          {
            type: "entity",
            value: "Australia",
            metadata: { entityType: "metric_names" },
          },
          {
            type: "text",
            value: " takes the second position, with a proportion of ",
          },

          {
            type: "entity",
            value: "7.32%",
            metadata: {
              entityType: "metric_value",
              insightType: "Proportion",
              origin: 0.0732,
              detail: [0.0732, 1 - 0.0732],
            },
          },
          // {
          //   type: "entity",
          //   value: "",
          //   metadata: {
          //     entityType: "insight",
          //     insightType: "Proportion",
          //     origin: 0.0732,
          //     detail: [0.0732, 1 - 0.0732],
          //   },
          // },
          { type: "IconPadding", value: "", metadata: { entityType: "sentenceEnd" } },
        ],
      },
      {
        type: "plot",
        chartType: "Proportion",
        metadata: {
          detail: ProportionData.data,
        },
      },
      {
        type: "configuration",
        chartType: "Proportion",
        metadata: {
          timeSelection: ["2011-01-01", "2014-12-31"],
          drillDownGroup: "Country",
        },
      },
    ],
  },
  {
    CardName: "Card4",
    paragraph: [
      {
        type: "topic",
        phrases: [
          { type: "CardTitle", value: "Temporal Trend" },
          { type: "text", value: " Trend of " },
          {
            type: "entity",
            value: "Sales",
            metadata: { entityType: "metric_names", interactionType: "y-axis" },
          },
        ],
      },
      // {
      //   type: "normal",
      //   phrases: [
      //     { type: "IconPadding", value: "", metadata: { entityType: "sentenceStart" } },
      //     // { type: "text", value: "According to the " },
      //     // {
      //     //   type: "entity",
      //     //   value: "linear regression,",
      //     //   metadata: {
      //     //     entityType: "algorithm",
      //     //     origin:
      //     //       "A statistical model which estimates the linear relationship between a scalar response and one explanatory variables",
      //     //   },
      //     // },
      //     { type: "IconPadding", value: "", metadata: { entityType: "sentenceEnd" } },
      //   ],
      // },
      {
        type: "normal",
        phrases: [
          { type: "IconPadding", value: "", metadata: { entityType: "sentenceStart" } },
          { type: "text", value: "In the past " },
          {
            type: "entity",
            value: "365 days",
            metadata: {
              entityType: "filter_cate",
              selections: ["365 days", "30 days", "7 days"],
              backEndType: "timeSegmentationCondition",
            },
          },
          { type: "text", value: ", there is an " },

          {
            type: "entity",
            value: "increased",
            metadata: {
              entityType: "binary_value_positive",
              insightType: "TemporalityTrend",
              detail: TrendData11.data as cateAndValue[],
              tagData: TrendData11.predictData as cateAndValue[],
              assessment: "increase",
            },
          },
          { type: "text", value: " trend in " },
          {
            type: "entity",
            value: "Sales.",
            metadata: { entityType: "metric_names", interactionType: "y-axis" },
          },
          { type: "IconPadding", value: "", metadata: { entityType: "sentenceEnd" } },
        ],
      },
      {
        type: "normal",
        phrases: [
          { type: "IconPadding", value: "", metadata: { entityType: "sentenceStart" } },
          { type: "text", value: "According to " },
          {
            type: "entity",
            value: "PROPHET algorithm",
            metadata: {
              entityType: "algorithm",
              origin:
                "The Prophet Algorithm is an open-source forecasting algorithm used for time series prediction. Its working principle is based on decom" +
                "posing time series data into a combination of trend, seasonality, and holiday effects. By adding these components together, it can generate forecasts for future time points.",
            },
          },
          { type: "text", value: ", the trend will be " },
          {
            type: "entity",
            value: "increasing",
            metadata: {
              entityType: "binary_value_positive",
              assessment: "increase",
              interactionType: "Temporal Trend Regression",
            },
          },
          { type: "text", value: " With a predicted value of " },
          {
            type: "entity",
            value: "11219.24 ",
            metadata: { entityType: "metric_value", origin: 11219.24, interactionType: "ByValue" },
          },
          { type: "text", value: "until " },
          {
            type: "entity",
            value: "January 10, 2012",
            metadata: {
              entityType: "filter_time",
              selections: ["2012-01-10"],
              paramIndex: 0,
            },
          },
          { type: "IconPadding", value: "", metadata: { entityType: "sentenceEnd" } },
        ],
      },
      {
        type: "plot",
        chartType: "TemporalTrend",
        metadata: {
          detail: [...TrendData11.data, ...TrendData11.predictData] as cateAndValue[],
          tagData: TrendData11.tagData as cateAndValue[],
        },
      },
      {
        type: "configuration",
        chartType: "TemporalTrend",
        metadata: {
          timeSelection: ["2012-01-10"],
          timeSegmentationCondition: "365 days",
        },
      },
    ],
  },
  {
    CardName: "Card5",
    paragraph: [
      {
        type: "topic",
        phrases: [
          { type: "CardTitle", value: "Temporal Anomaly" },
          { type: "text", value: " Anomaly Detection of " },
          {
            type: "entity",
            value: "Sales",
            metadata: { entityType: "metric_names", interactionType: "y-axis" },
          },
        ],
      },
      {
        type: "normal",
        phrases: [
          { type: "IconPadding", value: "", metadata: { entityType: "sentenceStart" } },
          { type: "text", value: "According to the " },
          {
            type: "entity",
            value: "Confidence interval method ",
            metadata: {
              entityType: "algorithm",
              origin:
                "Local trends were first estimated using LOWESS (Locally Weighted Scatterplot Smoothing) by weighting the neighboring data points near each data point to get the predicted values and confidence intervals were calculated to get the outliers.",
            },
          },
          { type: "text", value: ", in the past " },
          {
            type: "entity",
            value: "365 days",
            metadata: {
              entityType: "filter_cate",
              selections: ["365 days", "30 days", "7 days"],
              backEndType: "timeSegmentationCondition",
            },
          },
          { type: "text", value: " , there are " },
          {
            type: "entity",
            value: "9",
            metadata: { entityType: "binary_value_negative", assessment: "anomaly" },
          },
          {
            type: "entity",
            value: " anomalies",
            metadata: {
              entityType: "insight",
              insightType: "TemporalityAnomaly",
              detail: AnomalyData.data,
            },
          },
          { type: "text", value: ". 2 seasons are identified, and the average period is " },
          {
            type: "entity",
            value: "365 ",
            metadata: { entityType: "metric_value", origin: 365 },
          },
          { type: "text", value: "days. " },
          { type: "IconPadding", value: "", metadata: { entityType: "sentenceEnd" } },
        ],
      },

      {
        type: "bullet",
        phrases: [
          { type: "IconPadding", value: "", metadata: { entityType: "sentenceStart" } },
          { type: "text", value: " 2011-10-14, " },
          {
            type: "entity",
            value: "Sales",
            metadata: { entityType: "metric_names", interactionType: "y-axis" },
          },
          { type: "text", value: " = " },
          {
            type: "entity",
            value: "14453.23 ",
            metadata: { entityType: "metric_value", origin: 14453.23, interactionType: "ByValue" },
          },
          { type: "text", value: "exceeding the baseline " },
          {
            type: "entity",
            value: "6235.21",
            metadata: {
              entityType: "binary_value_positive",
              assessment: "positive",
              origin: 6235.21,
              interactionType: "ByValue",
            },
          },
          { type: "IconPadding", value: "", metadata: { entityType: "sentenceEnd" } },
        ],
      },
      {
        type: "bullet",
        phrases: [
          { type: "IconPadding", value: "", metadata: { entityType: "sentenceStart" } },
          { type: "text", value: " 2011-10-27, " },
          {
            type: "entity",
            value: "Sales",
            metadata: { entityType: "metric_names", interactionType: "y-axis" },
          },
          { type: "text", value: " = " },
          {
            type: "entity",
            value: "17289.69 ",
            metadata: { entityType: "metric_value", origin: 17289.69, interactionType: "ByValue" },
          },
          { type: "text", value: "exceeding the baseline " },
          {
            type: "entity",
            value: "4995.34.",
            metadata: {
              entityType: "binary_value_positive",
              assessment: "positive",
              origin: 4995.34,
              interactionType: "ByValue",
            },
          },
          { type: "IconPadding", value: "", metadata: { entityType: "sentenceEnd" } },
        ],
      },
      {
        type: "bullet",
        phrases: [
          { type: "IconPadding", value: "", metadata: { entityType: "sentenceStart" } },
          { type: "text", value: " 2011-10-06, " },
          {
            type: "entity",
            value: "Sales",
            metadata: { entityType: "metric_names", interactionType: "y-axis" },
          },
          { type: "text", value: " = " },
          {
            type: "entity",
            value: "17289.69 ",
            metadata: { entityType: "metric_value", origin: 17289.69, interactionType: "ByValue" },
          },
          { type: "text", value: "exceeding the baseline " },
          {
            type: "entity",
            value: "6732.64",
            metadata: {
              entityType: "binary_value_positive",
              assessment: "positive",
              origin: 6732.64,
              interactionType: "ByValue",
            },
          },
          { type: "IconPadding", value: "", metadata: { entityType: "sentenceEnd" } },
        ],
      },
      {
        type: "plot",
        chartType: "TemporalAnomaly",
        metadata: {
          detail: AnomalyData.data,
        },
      },
      {
        type: "configuration",
        chartType: "TemporalAnomaly",
        metadata: {
          timeSegmentationCondition: "365 days",
        },
      },
    ],
  },
  {
    CardName: "Card6",
    paragraph: [
      {
        type: "topic",
        phrases: [
          { type: "CardTitle", value: "Temporal Periodicity" },
          { type: "text", value: " Periodicity of " },
          {
            type: "entity",
            value: "Sales",
            metadata: { entityType: "metric_names", interactionType: "y-axis" },
          },
        ],
      },
      {
        type: "normal",
        phrases: [
          { type: "IconPadding", value: "", metadata: { entityType: "sentenceStart" } },
          // { type: "text", value: "From " },
          { type: "text", value: "According to the " },
          {
            type: "entity",
            value: "ACF algorithm",
            metadata: {
              entityType: "algorithm",
              origin:
                "The Autocorrelation Function (ACF) is a statistical tool used for analyzing time series data, measuring the correlation between a data point at a given time and data points at different lagged time points. It helps in identifying seasonal and" +
                " periodic patterns in time series data. By examining the ACF plot, you can identify significant positive or negative correlations at various lagged time points, allowing you to infer the presence of seasonal cycles.",
            },
          },
          { type: "text", value: ", in the past " },
          {
            type: "entity",
            value: "4 years",
            metadata: {
              entityType: "filter_cate",
              selections: ["4 years", "3 years", "2 years"],
              backEndType: "timeSegmentationCondition",
            },
          },
          { type: "text", value: " ,the seasonality of the trend is " },
          {
            type: "entity",
            value: "significant",
            metadata: { entityType: "binary_value_positive", assessment: "significant" },
          },
          {
            type: "text",
            value: ". ",
          },
          {
            type: "entity",
            value: "2 seasons",
            metadata: {
              entityType: "insight",
              insightType: "TemporalitySeasonality",
              detail: PeriodicityData.data,
              tagData: PeriodicityData.tagData,
            },
          },
          { type: "text", value: " are identified, and the average period is " },
          {
            type: "entity",
            value: "365 ",
            metadata: { entityType: "metric_value", origin: 365 },
          },
          { type: "text", value: "days. " },
          { type: "IconPadding", value: "", metadata: { entityType: "sentenceEnd" } },
        ],
      },
      {
        type: "bullet",
        phrases: [
          { type: "IconPadding", value: "", metadata: { entityType: "sentenceStart" } },

          { type: "text", value: " 2011-01 - 2012-01: peak = " },
          {
            type: "entity",
            value: "11 ",
            metadata: { entityType: "metric_value", origin: 11 },
          },
          { type: "text", value: ", bottom = " },
          // {
          //   type: "entity",
          //   value: "02 ",
          //   metadata: { entityType: "metric_value", origin: 2 },
          // },
          // {
          //   type: 'entity',
          //   value: '256368.16',
          //   metadata: { entityType: 'metric_value', origin: 256368.16 },
          // },
          {
            type: "entity",
            value: "02 ",
            metadata: {
              entityType: "metric_value",
              insightType: "TemporalitySeasonality",
              detail: PeriodicityData.data,
              tagData: PeriodicityData.tagData1, // 标记第几个数据高亮
            },
          },
          { type: "IconPadding", value: "", metadata: { entityType: "sentenceEnd" } },
        ],
      },
      {
        type: "bullet",
        phrases: [
          { type: "IconPadding", value: "", metadata: { entityType: "sentenceStart" } },

          { type: "text", value: " 2012-01 - 2013-01: peak = " },
          {
            type: "entity",
            value: "11 ",
            metadata: { entityType: "metric_value", origin: 11 },
          },
          { type: "text", value: ", bottom = " },
          // {
          //   type: "entity",
          //   value: "02 ",
          //   metadata: { entityType: "metric_value", origin: 2 },
          // },
          // {
          //   type: 'entity',
          //   value: '256368.16',
          //   metadata: { entityType: 'metric_value', origin: 256368.16 },
          // },
          {
            type: "entity",
            value: "02 ",
            metadata: {
              entityType: "metric_value",
              insightType: "TemporalitySeasonality",
              detail: PeriodicityData.data,
              tagData: PeriodicityData.tagData2, // 标记第几个数据高亮
            },
          },
          { type: "IconPadding", value: "", metadata: { entityType: "sentenceEnd" } },
        ],
      },
      {
        type: "plot",
        chartType: "TemporalPeriodicity",
        metadata: {
          detail: PeriodicityData.data,
          tagData: PeriodicityData.tagData,
        },
      },
      {
        type: "configuration",
        chartType: "TemporalPeriodicity",
        metadata: {
          timeSegmentationCondition: "4 years",
        },
      },
    ],
  },
  {
    CardName: "Card7",
    paragraph: [
      {
        type: "topic",
        phrases: [
          { type: "CardTitle", value: "Association" },
          { type: "text", value: " Association between " },
          {
            type: "entity",
            value: "Sales",
            metadata: { entityType: "metric_names", interactionType: "x-axis" },
          },
          { type: "text", value: " and " },
          {
            type: "entity",
            value: "Profit",
            metadata: { entityType: "metric_names", interactionType: "y-axis" },
          },
        ],
      },
      {
        type: "normal",
        phrases: [
          { type: "IconPadding", value: "", metadata: { entityType: "sentenceStart" } },

          { type: "text", value: "According to the " },
          {
            type: "entity",
            value: "Pearson correlation coefficient",
            metadata: {
              entityType: "algorithm",
              origin:
                "The Pearson correlation coefficient measures the strength and direction of the linear relationship between two variables. The coefficient's values range from -1 to 1. When the correlation coefficient" +
                " is equal to 1, it indicates a perfect positive linear relationship between the two variables, meaning that an increase in one variable is always accompanied by an increase in the other, and vice versa.",
            },
          },
          { type: "text", value: ", the correlation between " },
          {
            type: "entity",
            value: "Sales",
            metadata: { entityType: "metric_names", interactionType: "x-axis" },
          },
          { type: "text", value: " and " },
          {
            type: "entity",
            value: "Profit",
            metadata: { entityType: "metric_names", interactionType: "y-axis" },
          },
          { type: "text", value: " equals " },
          {
            type: "entity",
            value: "0.65",
            metadata: {
              entityType: "metric_value",
              insightType: "Association",
              detail: AssociationData.data,
              tagData: AssociationData.tagData,
              interactionType: "Association Regression",
            },
          },
          { type: "text", value: ", indicating a " },
          {
            type: "entity",
            value: "positive",
            metadata: { entityType: "binary_value_positive", assessment: "positive" },
          },
          { type: "text", value: " relationship. Besides, the correlation is statistically " },
          {
            type: "entity",
            value: "significant",
            metadata: {
              entityType: "binary_value_positive",
              assessment: "significant",
            },
          },
          { type: "IconPadding", value: "", metadata: { entityType: "sentenceEnd" } },
        ],
      },
      {
        type: "plot",
        chartType: "Association",
        metadata: {
          detail: AssociationData.data,
          tagData: AssociationData.tagData,
        },
      },
      {
        type: "configuration",
        chartType: "Association",
        metadata: {},
      },
    ],
  },
  {
    CardName: "Card8",
    paragraph: [
      {
        type: "topic",
        phrases: [
          { type: "CardTitle", value: "Distribution" },
          { type: "text", value: " Distribution of " },
          {
            type: "entity",
            value: "Sales",
            metadata: { entityType: "metric_names" },
          },
        ],
      },
      {
        type: "normal",
        phrases: [
          { type: "IconPadding", value: "", metadata: { entityType: "sentenceStart" } },
          { type: "text", value: "From " },
          {
            type: "entity",
            value: "January 01, 2011",
            metadata: {
              entityType: "filter_time",
              selections: ["2011-01-01"],
              paramIndex: 0,
            },
          },
          { type: "text", value: " to " },
          {
            type: "entity",
            value: "December 31, 2014",
            metadata: {
              entityType: "filter_time",
              selections: ["2014-12-31"],
              paramIndex: 1,
            },
          },
          {
            type: "text",
            value: ", the distribution of ",
          },
          {
            type: "entity",
            value: " Sales ",
            metadata: { entityType: "metric_names" },
          },
          {
            type: "text",
            value: "is ",
          },
          // {
          //   type: "entity",
          //   value: "left-skewed ",
          //   metadata: { entityType: "binary_value_negative", assessment: "negative" },
          // },
          {
            type: "entity",
            value: " left-skewed ",
            metadata: {
              entityType: "insight",
              insightType: "Distribution",
              detail: DistributionData.data,
            },
          },
          {
            type: "text",
            value: ". Most data points lie in the range of ",
          },
          {
            type: "entity",
            value: "0",
            metadata: { entityType: "metric_value", origin: 0 },
          },
          {
            type: "text",
            value: " - ",
          },
          {
            type: "entity",
            value: "7700",
            metadata: { entityType: "metric_value", origin: 7700.14 },
          },
          {
            type: "text",
            value: ", ",
          },
          {
            type: "entity",
            value: "29",
            metadata: {
              entityType: "metric_value",
              origin: 29,
              interactionType: "distribution Outliers",
              assessment: "anomaly",
            },
          },
          { type: "text", value: " outliers have been identified, with " },
          { type: "IconPadding", value: "", metadata: { entityType: "sentenceEnd" } },
        ],
      },
      {
        type: "bullet",
        phrases: [
          { type: "IconPadding", value: "", metadata: { entityType: "sentenceStart" } },
          { type: "text", value: "Min = " },
          {
            type: "entity",
            value: "2.69",
            metadata: {
              entityType: "metric_value",
              origin: 2.69,
              interactionType: "distribution Min",
            },
          },
          { type: "text", value: " , Max = " },
          {
            type: "entity",
            value: "39536.13",
            metadata: {
              entityType: "metric_value",
              origin: 39536.13,
              interactionType: "distribution Max",
            },
          },
          { type: "IconPadding", value: "", metadata: { entityType: "sentenceEnd" } },
        ],
      },
      {
        type: "bullet",
        phrases: [
          { type: "IconPadding", value: "", metadata: { entityType: "sentenceStart" } },
          { type: "text", value: "Q1 = " },
          {
            type: "entity",
            value: "3794.66",
            metadata: {
              entityType: "metric_value",
              origin: 3794.66,
              interactionType: "distribution Q1",
            },
          },
          { type: "text", value: " , Q2 (Median) = " },
          {
            type: "entity",
            value: "7700.14",
            metadata: {
              entityType: "metric_value",
              origin: 7700.14,
              interactionType: "distribution Median",
            },
          },
          { type: "text", value: " , Q3 = " },
          {
            type: "entity",
            value: "12466.37",
            metadata: {
              entityType: "metric_value",
              origin: 12466.37,
              interactionType: "distribution Q3",
            },
          },
          { type: "IconPadding", value: "", metadata: { entityType: "sentenceEnd" } },
        ],
      },
      // {
      //   type: "bullet",
      //   phrases: [
      //     { type: "IconPadding", value: "", metadata: { entityType: "sentenceStart" } },
      //     { type: "text", value: "Mean = " },
      //     {
      //       type: "entity",
      //       value: "8840.91",
      //       metadata: { entityType: "metric_value", origin: 8840.91 },
      //     },
      //     { type: "text", value: " , Standard deviation = " },
      //     // {
      //     //   type: "entity",
      //     //   value: "6567.82",
      //     //   metadata: { entityType: "metric_value", origin: 6567.82 },
      //     // },
      //     {
      //       type: "entity",
      //       value: "6567.82",
      //       metadata: {
      //         entityType: "metric_value",
      //         insightType: "Distribution",
      //         detail: DistributionData.data,
      //       },
      //     },
      //     { type: "IconPadding", value: "", metadata: { entityType: "sentenceEnd" } },
      //   ],
      // },

      {
        type: "plot",
        chartType: "Distribution",
        metadata: {
          detail: DistributionData.data,
        },
      },
      {
        type: "configuration",
        chartType: "Distribution",
        metadata: {
          timeSelection: ["2011-01-01", "2014-12-31"],
        },
      },
    ],
  },
]
