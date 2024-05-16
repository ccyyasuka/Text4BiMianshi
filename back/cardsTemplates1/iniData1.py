
# import AnomalyData,AssociationData,CategoryData,DifferenceData,DistributionData,PeriodicityData,ProportionData,TrendData
from AnomalyData import AnomalyData
from AssociationData import AssociationData
from CategoryData import CategoryData
from DifferenceData import DifferenceData
from DistributionData import DistributionData
from PeriodicityData import PeriodicityData
from ProportionData import ProportionData
from TrendData import TrendDataData
data = [
    {
    "CardName": "Card1",
    "paragraph": [
      {
        "type": "topic",
        "phrases": [
          { "type": "CardTitle", "value": "Distribution" },
          { "type": "text", "value": " Distribution of " },
          {
            "type": "entity",
            "value": "Sales",
            "metadata": { "entityType": "metric_names" },
          },
        ],
      },
      {
        "type": "normal",
        "phrases": [
          { "type": "IconPadding", "value": "", "metadata": { "entityType": "sentenceStart" } },
          { "type": "text", "value": "From " },
          {
            "type": "entity",
            "value": "January 01, 2011",
            "metadata": {
              "entityType": "filter_time",
              "selections": ["2011-01-01"],
              "paramIndex": 0,
            },
          },
          { "type": "text", "value": " to " },
          {
            "type": "entity",
            "value": "December 31, 2014",
            "metadata": {
              "entityType": "filter_time",
              "selections": ["2014-12-31"],
              "paramIndex": 1,
            },
          },
          {
            "type": "text",
            "value": ", the distribution of ",
          },
          {
            "type": "entity",
            "value": " Sales ",
            "metadata": { "entityType": "metric_names" },
          },
          {
            "type": "text",
            "value": "is ",
          },
          
          {
            "type": "entity",
            "value": " left-skewed ",
            "metadata": {
              "entityType": "insight",
              "insightType": "Distribution",
              "detail": DistributionData["data"],
            },
          },
          {
            "type": "text",
            "value": "Most data points lie in the range of ",
          },
          {
            "type": "entity",
            "value": "0",
            "metadata": { "entityType": "metric_value", "origin": 0 },
          },
          {
            "type": "text",
            "value": " - ",
          },
          {
            "type": "entity",
            "value": "7700",
            "metadata": { "entityType": "metric_value", "origin": 7700.14 },
          },
          {
            "type": "text",
            "value": ", ",
          },
          {
            "type": "entity",
            "value": "29",
            "metadata": {
              "entityType": "metric_value",
              "origin": 29,
              "interactionType": "distribution Outliers",
            },
          },
          { "type": "text", "value": " outliers have been identified, with " },
          { "type": "IconPadding", "value": "", "metadata": { "entityType": "sentenceEnd" } },
        ],
      },
      {
        "type": "bullet",
        "phrases": [
          { "type": "IconPadding", "value": "", "metadata": { "entityType": "sentenceStart" } },
          { "type": "text", "value": "Min = " },
          {
            "type": "entity",
            "value": "2.69",
            "metadata": {
              "entityType": "metric_value",
              "origin": 2.69,
              "interactionType": "distribution Min",
            },
          },
          { "type": "text", "value": " , Max = " },
          {
            "type": "entity",
            "value": "39536.13",
            "metadata": {
              "entityType": "metric_value",
              "origin": 39536.13,
              "interactionType": "distribution Max",
            },
          },
          { "type": "IconPadding", "value": "", "metadata": { "entityType": "sentenceEnd" } },
        ],
      },
      {
        "type": "bullet",
        "phrases": [
          { "type": "IconPadding", "value": "", "metadata": { "entityType": "sentenceStart" } },
          { "type": "text", "value": "Q1 = " },
          {
            "type": "entity",
            "value": "3794.66",
            "metadata": {
              "entityType": "metric_value",
              "origin": 3794.66,
              "interactionType": "distribution Q1",
            },
          },
          { "type": "text", "value": " , Q2 (Median) = " },
          {
            "type": "entity",
            "value": "7700.14",
            "metadata": {
              "entityType": "metric_value",
              "origin": 7700.14,
              "interactionType": "distribution Median",
            },
          },
          { "type": "text", "value": " , Q3 = " },
          {
            "type": "entity",
            "value": "12466.37",
            "metadata": {
              "entityType": "metric_value",
              "origin": 12466.37,
              "interactionType": "distribution Q3",
            },
          },
          { "type": "IconPadding", "value": "", "metadata": { "entityType": "sentenceEnd" } },
        ],
      },
      {
        "type": "bullet",
        "phrases": [
          { "type": "IconPadding", "value": "", "metadata": { "entityType": "sentenceStart" } },
          { "type": "text", "value": "Mean = " },
          {
            "type": "entity",
            "value": "8840.91",
            "metadata": { "entityType": "metric_value", "origin": 8840.91 },
          },
          { "type": "text", "value": " , Standard deviation = " },
          
          {
            "type": "entity",
            "value": "6567.82",
            "metadata": {
              "entityType": "insight",
              "insightType": "Distribution",
              "detail": DistributionData["data"],
            },
          },
          { "type": "IconPadding", "value": "", "metadata": { "entityType": "sentenceEnd" } },
        ],
      },

      {
        "type": "plot",
        "chartType": "Distribution",
        "metadata": {
          "detail": DistributionData["data"],
        },
      },
      {
        "type": "configuration",
        "chartType": "Distribution",
        "metadata": {
          "timeSelection": ["2011-01-01", "2014-12-31"],
        },
      },
    ],
  },
  {
    "CardName": "Card2",
    "paragraph": [
      {
        "type": "topic",
        "phrases": [
          { "type": "CardTitle", "value": "Difference" },
          { "type": "text", "value": " Difference of total " },
          {
            "type": "entity",
            "value": "Profit",
            "metadata": { "entityType": "metric_names" },
          },
          { "type": "text", "value": " by " },
          {
            "type": "entity",
            "value": "Year",
            "metadata": { "entityType": "metric_names" },
          },
        ],
      },
      {
        "type": "normal",
        "phrases": [
          { "type": "IconPadding", "value": "", "metadata": { "entityType": "sentenceStart" } },
          { "type": "text", "value": "From " },
          {
            "type": "entity",
            "value": "2012.01.01",
            "metadata": { "entityType": "filter_time", "selections": ["2012-01-01"], "paramIndex": 2 },
          },
          { "type": "text", "value": "to " },
          {
            "type": "entity",
            "value": "2012.12.31",
            "metadata": { "entityType": "filter_time", "selections": ["2012-12-31"], "paramIndex": 3 },
          },
          { "type": "text", "value": ", total " },
          {
            "type": "entity",
            "value": "profit ",
            "metadata": { "entityType": "metric_names", "interactionType": "y-axis" },
          },
          {
            "type": "entity",
            "value": "increased ",
            "metadata": { "entityType": "binary_value_positive", "assessment": "increase" },
          },
          { "type": "text", "value": "by " },
          {
            "type": "entity",
            "value": "23.49% ",
            "metadata": { "entityType": "binary_value_positive", "assessment": "positive" },
          },
          {
            "type": "entity",
            "value": "(248940.81 → 307415) ",
            "metadata": {
              "entityType": "insight",
              "insightType": "TemporalDifference",
              "detail": DifferenceData["data"],
              "tagData": DifferenceData["tagData"],
            },
          },
          { "type": "text", "value": "from " },
          {
            "type": "entity",
            "value": "2011-01-01",
            "metadata": { "entityType": "filter_time", "selections": ["2011-01-01"], "paramIndex": 0 },
          },
          { "type": "text", "value": "to " },
          {
            "type": "entity",
            "value": "2011-12-31",
            "metadata": { "entityType": "filter_time", "selections": ["2011-12-31"], "paramIndex": 1 },
          },
          { "type": "IconPadding", "value": "", "metadata": { "entityType": "sentenceEnd" } },
        ],
      },

      {
        "type": "plot",
        "chartType": "TemporalDifference",
        "metadata": {
          "detail": DifferenceData["data"],
          "tagData": DifferenceData["tagData"],
        },
      },
      {
        "type": "configuration",
        "chartType": "TemporalDifference",
        "metadata": {
          "timeSelection": ["2011-01-01", "2011-12-31", "2012-01-01", "2012-12-31"],
        },
      },
    ],
  },
  {
    "CardName": "Card3",
    "paragraph": [
      {
        "type": "topic",
        "phrases": [
          { "type": "IconPadding", "value": "", "metadata": { "entityType": "sentenceStart" } },
          { "type": "CardTitle", "value": "Categorization" },
          { "type": "text", "value": " Sum of " },
          {
            "type": "entity",
            "value": "Sales",
            "metadata": { "entityType": "metric_names", "interactionType": "y-axis" },
          },
          { "type": "text", "value": " by " },
          {
            "type": "entity",
            "value": "City",
            "metadata": { "entityType": "metric_names", "interactionType": "x-axis" },
          },
          { "type": "IconPadding", "value": "", "metadata": { "entityType": "sentenceEnd" } },
        ],
      },
      {
        "type": "normal",
        "phrases": [
          { "type": "IconPadding", "value": "", "metadata": { "entityType": "sentenceStart" } },
          { "type": "text", "value": "When looking at " },
          {
            "type": "entity",
            "value": "sales",
            "metadata": { "entityType": "metric_names", "interactionType": "y-axis" },
          },
          { "type": "text", "value": " by " },
          {
            "type": "entity",
            "value": "City",
            "metadata": {
              "entityType": "filter_cate",
              "selections": ["City", "Market", "Country"],
              "interactionType": "x-axis",
              "backEndType": "drillDownGroup",
            },
          },
          { "type": "text", "value": ", there are " },
          {
            "type": "entity",
            "value": "7 ",
            "metadata": { "entityType": "metric_value", "origin": 7 },
          },
          {
            "type": "entity",
            "value": "categories",
            "metadata": {
              "entityType": "insight",
              "insightType": "Categorization",
              "detail": CategoryData["data"],
              "tagData": -1,
            },
          },
          { "type": "text", "value": ", and the top " },
          {
            "type": "entity",
            "value": "3",
            "metadata": {
              "entityType": "filter_cate",
              "selections": ["3", "4", "5"],
              "interactionType": "multiHighlight",
              "backEndType": "topK",
            },
          },
          { "type": "text", "value": " categories are:" },
          { "type": "IconPadding", "value": "", "metadata": { "entityType": "sentenceEnd" } },
        ],
      },
      {
        "type": "bullet",
        "phrases": [
          { "type": "IconPadding", "value": "", "metadata": { "entityType": "sentenceStart" } },
          {
            "type": "entity",
            "value": "New York City",
            "metadata": { "entityType": "metric_names", "interactionType": "ByValue" },
          },
          {
            "type": "text",
            "value": ": ",
          },
          
          {
            "type": "entity",
            "value": "256368.16",
            "metadata": {
              "entityType": "insight",
              "insightType": "Categorization",
              "detail": CategoryData["data"],
              "tagData": 0, 
              "origin": 256368.161,
              "interactionType": "ByValue",
            },
          },
          { "type": "IconPadding", "value": "", "metadata": { "entityType": "sentenceEnd" } },
        ],
      },
      {
        "type": "bullet",
        "phrases": [
          { "type": "IconPadding", "value": "", "metadata": { "entityType": "sentenceStart" } },
          {
            "type": "entity",
            "value": "Los Angeles",
            "metadata": { "entityType": "metric_names", "interactionType": "ByValue" },
          },
          {
            "type": "text",
            "value": ": ",
          },
          
          {
            "type": "entity",
            "value": "175851.34",
            "metadata": {
              "entityType": "insight",
              "insightType": "Categorization",
              "detail": CategoryData["data"],
              "tagData": 1, 
              "origin": 175851.34,
              "interactionType": "ByValue",
            },
          },
          { "type": "IconPadding", "value": "", "metadata": { "entityType": "sentenceEnd" } },
        ],
      },
      {
        "type": "bullet",
        "phrases": [
          { "type": "IconPadding", "value": "", "metadata": { "entityType": "sentenceStart" } },
          {
            "type": "entity",
            "value": "Manila",
            "metadata": { "entityType": "metric_names", "interactionType": "ByValue" },
          },
          {
            "type": "text",
            "value": ": ",
          },
          
          {
            "type": "entity",
            "value": "120886.95",
            "metadata": {
              "entityType": "insight",
              "insightType": "Categorization",
              "detail": CategoryData["data"],
              "tagData": 2, 
              "origin": 120886.95,
              "interactionType": "ByValue",
            },
          },
          { "type": "IconPadding", "value": "", "metadata": { "entityType": "sentenceEnd" } },
        ],
      },
      {
        "type": "plot",
        "chartType": "Categorization",
        "metadata": {
          "detail": CategoryData["data"],
        },
      },
      {
        "type": "configuration",
        "chartType": "Categorization",
        "metadata": {
          "drillDownGroup": "City",
          "topK": "3",
        },
      },
    ],
  },
  {
    "CardName": "Card4",
    "paragraph": [
      {
        "type": "topic",
        "phrases": [
          { "type": "CardTitle", "value": "Proportion" },
          {
            "type": "entity",
            "value": "Proportion Analysis of Sales Volume by Different Countries",
          },
        ],
      },
      {
        "type": "normal",
        "phrases": [
          { "type": "IconPadding", "value": "", "metadata": { "entityType": "sentenceStart" } },

          { "type": "text", "value": "From " },
          {
            "type": "entity",
            "value": "January 1, 2011",
            "metadata": { "entityType": "filter_time", "selections": ["2011-01-01"], "paramIndex": 0 },
          },
          { "type": "text", "value": " to " },
          {
            "type": "entity",
            "value": "December 31, 2014",
            "metadata": { "entityType": "filter_time", "selections": ["2014-12-31"], "paramIndex": 1 },
          },
          {
            "type": "text",
            "value": ", when drilling down by ",
          },
          {
            "type": "entity",
            "value": "Country",
            "metadata": {
              "entityType": "filter_cate",
              "selections": ["Country", "City", "Market"],
              "backEndType": "drillDownGroup",
            },
          },
          {
            "type": "text",
            "value": ", the specific proportions of total ",
          },
          {
            "type": "entity",
            "value": "sales",
            "metadata": { "entityType": "metric_names" },
          },
          {
            "type": "text",
            "value": " volume are as follows:",
          },
          { "type": "IconPadding", "value": "", "metadata": { "entityType": "sentenceEnd" } },
        ],
      },
      {
        "type": "bullet",
        "phrases": [
          { "type": "IconPadding", "value": "", "metadata": { "entityType": "sentenceStart" } },

          {
            "type": "entity",
            "value": "United States",
            "metadata": { "entityType": "metric_names" },
          },
          {
            "type": "text",
            "value": " ranks first, with a proportion of ",
          },

          {
            "type": "entity",
            "value": "18.17%",
            "metadata": {
              "entityType": "metric_value",
              "insightType": "Proportion",
              "origin": 0.1817,
              "detail": [0.1817, 1 - 0.1817],
            },
          },
          {
            "type": "entity",
            "value": "啊啊啊",
            "metadata": {
              "entityType": "insight",
              "insightType": "Proportion",
              "origin": 0.1817,
              "detail": [0.1817, 1 - 0.1817],
            },
          },

          { "type": "IconPadding", "value": "", "metadata": { "entityType": "sentenceEnd" } },
        ],
      },
      {
        "type": "bullet",
        "phrases": [
          { "type": "IconPadding", "value": "", "metadata": { "entityType": "sentenceStart" } },

          {
            "type": "entity",
            "value": "Australia",
            "metadata": { "entityType": "metric_names" },
          },
          {
            "type": "text",
            "value": " takes the second position, with a proportion of ",
          },

          {
            "type": "entity",
            "value": "7.32%",
            "metadata": {
              "entityType": "metric_value",
              "insightType": "Proportion",
              "origin": 0.0732,
              "detail": [0.0732, 1 - 0.0732],
            },
          },
          
          { "type": "IconPadding", "value": "", "metadata": { "entityType": "sentenceEnd" } },
        ],
      },
      {
        "type": "plot",
        "chartType": "Proportion",
        "metadata": {
          "detail": ProportionData["data"],
        },
      },
      {
        "type": "configuration",
        "chartType": "Proportion",
        "metadata": {
          "timeSelection": ["2011-01-01", "2014-12-31"],
          "drillDownGroup": "Country",
        },
      },
    ],
  },
  {
    "CardName": "Card5",
    "paragraph": [
      {
        "type": "topic",
        "phrases": [
          { "type": "CardTitle", "value": "Association" },
          { "type": "text", "value": " Association between " },
          {
            "type": "entity",
            "value": "Sales",
            "metadata": { "entityType": "metric_names", "interactionType": "x-axis" },
          },
          { "type": "text", "value": " and " },
          {
            "type": "entity",
            "value": "Profit",
            "metadata": { "entityType": "metric_names", "interactionType": "y-axis" },
          },
        ],
      },
      {
        "type": "normal",
        "phrases": [
          { "type": "IconPadding", "value": "", "metadata": { "entityType": "sentenceStart" } },

          { "type": "text", "value": "According to the " },
          {
            "type": "entity",
            "value": "Pearson correlation coefficient",
            "metadata": {
              "entityType": "algorithm",
              "origin":
                "The Pearson correlation coefficient measures the strength and direction of the linear relationship between two variables. The coefficient's values range from -1 to 1. When the correlation coefficient" +
                " is equal to 1, it indicates a perfect positive linear relationship between the two variables, meaning that an increase in one variable is always accompanied by an increase in the other, and vice versa.",
            },
          },
          { "type": "text", "value": ", the correlation between " },
          {
            "type": "entity",
            "value": "Sales",
            "metadata": { "entityType": "metric_names", "interactionType": "x-axis" },
          },
          { "type": "text", "value": " and " },
          {
            "type": "entity",
            "value": "Profit",
            "metadata": { "entityType": "metric_names", "interactionType": "y-axis" },
          },
          { "type": "text", "value": " equals " },
          {
            "type": "entity",
            "value": "0.65",
            "metadata": {
              "entityType": "insight",
              "insightType": "Association",
              "detail": AssociationData["data"],
              "tagData": AssociationData["tagData"],
            },
          },
          { "type": "text", "value": " indicating a " },
          {
            "type": "entity",
            "value": "positive",
            "metadata": { "entityType": "binary_value_positive", "assessment": "positive" },
          },
          { "type": "text", "value": " relationship. Besides, the correlation is statistically " },
          {
            "type": "entity",
            "value": "significant",
            "metadata": {
              "entityType": "binary_value_positive",
              "assessment": "significant",
              "interactionType": "Association Regression",
            },
          },
          { "type": "IconPadding", "value": "", "metadata": { "entityType": "sentenceEnd" } },
        ],
      },
      {
        "type": "plot",
        "chartType": "Association",
        "metadata": {
          "detail": AssociationData["data"],
          "tagData": AssociationData["tagData"],
        },
      },
      {
        "type": "configuration",
        "chartType": "Association",
        "metadata": {},
      },
    ],
  },
  
 ]
