export function getCardMetadataQueryString(cardId) {
  return `
    {
      node(id: "${cardId}") {
        id,
        ... on Card {
          type
          size
          created
          updated
          description
          title
          responsibleUserId
          cardConfig {
            title
            chartType
            metricKey
            metricUnit
            chartXLabel
            chartYLabel
            chartXType
            chartYType
            dataMappings {
              purpose
              dataAccessorId
              columnDescriptions {
                attributeName
                displayName
              }
            }
          }
          dataAccessors {
            id
            type
            config {
              table
              columns
            }
          }
        }
      }
    }
  `;
}

export function getBoardMetadataQueryString(id) {
  // TODO: should be implemented after turbine is ready
  return `${id}`;
}
