'use strict'
const handleGreeting = client.createStep({
  satisfied() {
    return false
  },

  prompt() {
    client.addResponse('Hola')
    client.done()
  }
})

const handleCotiz = client.createStep({
  satisfied() {
    return false
  },

  prompt() {
    client.addResponse('cotizacion')
    client.done()
  }
})

exports.handle = (client) => {
  // Create steps
  const sayHello = client.createStep({
    satisfied() {
      return Boolean(client.getConversationState().helloSent)
    },

    prompt() {
      client.addResponse('welcome')
      client.addResponse('provide/documentation', {
        documentation_link: 'http://docs.init.ai',
      })
      client.addResponse('provide/instructions')

      client.updateConversationState({
        helloSent: true
      })

      client.done()
    }
  })

  const untrained = client.createStep({
    satisfied() {
      return false
    },

    prompt() {
      client.addResponse('apology/untrained')
      client.done()
    }
  })

  client.runFlow({
    classifications: {
      // map inbound message classifications to names of streams
          greeting: 'greeting',
          greeting: 'Hola',
          greeting: 'Hola buenos dias',
          cotizacion: 'cotizacion',


    },
    autoResponses: {
      // configure responses to be automatically sent as predicted by the machine learning model
    },
    streams: {
      greeting: handleGreeting,
      cotizacion:handleCotiz,
      main: 'onboarding',
      onboarding: [sayHello],
      end: [untrained],
    },
  })
}
