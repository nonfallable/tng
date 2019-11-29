import dictionary from './dictionary'
const source = JSON.parse(dictionary)

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const commonStrategy = ({ suffix, core, postfix }) => ({
  suffix: () => suffix[getRandomInt(0, suffix.length - 1)],
  core: () => core[getRandomInt(0, core.length - 1)],
  postfix: () => postfix[getRandomInt(0, postfix.length - 1)],
})

const payForLetterStrategy = ({ transcriptions, alphabet, suffix, core, postfix }) => {
  let source = [transcriptions, alphabet][getRandomInt(0, 1)]
  return ({
    core: () => {
      let result = ""
      const limit = getRandomInt(1, 3)
      for(let i = 0; i < limit; i++){
        const letter = source[getRandomInt(0, source.length - 1)]
        result += letter
        source = source.filter(l => l !== letter)
      }
      return result
    },
    postfix: () => [...suffix, ...core, ...postfix][getRandomInt(0, postfix.length - 1)],
  })
}

const strategies = {
  goleaf: (dict) => ({
    ...commonStrategy(dict),
    partFormatter: (part) => part[0].toUpperCase() + part.slice(1, part.length),
    joinFormatter: (parts) => parts.filter(part => !!part).join(''),
  }),
  goleafSpaceBetween: (dict) => ({
    ...commonStrategy(dict),
    partFormatter: (part) => part[0].toUpperCase() + part.slice(1, part.length),
    joinFormatter: (parts) => parts.filter(part => !!part).join(' '),
  }),
  capsLock: (dict) => ({
    ...commonStrategy(dict),
    partFormatter: (part) => part.toUpperCase(),
    joinFormatter: (parts) => parts.filter(part => !!part).join(' '),
  }),
  payForLetter: (dict) => ({
    ...payForLetterStrategy(dict),
    partFormatter: (part) => part.toUpperCase(),
    joinFormatter: (parts) => parts.filter(part => !!part).join(' '),
  })
}

const makeName = () => {
  const keys = Object.keys(strategies)
  const strategyKey = keys[getRandomInt(0, keys.length - 1)]
  console.log(strategyKey)
  const { suffix: suffixGenerator, core: coreGenerator, postfix: postfixGenerator, partFormatter, joinFormatter } = strategies[strategyKey](source)
  const suffix = suffixGenerator && partFormatter(suffixGenerator())
  const core = partFormatter(coreGenerator())
  const postfix = partFormatter(postfixGenerator())
  return joinFormatter([suffix, core, postfix])
}

export default makeName
