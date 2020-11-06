import PublicMethodClass, {responseWatch} from '../PublicMethodClass'


class TestStore extends PublicMethodClass {
  changeUiTest = 'changeUiTest'
  noChangeUiTest = 'noChangeUiTest'

  @responseWatch('changeUiTest')
  setChangeUiTest(changeUiTest: string) {
    this.changeUiTest = changeUiTest
    console.log('setChangeUiTest:', this.changeUiTest)
  }

  @responseWatch('noChangeUiTest')
  setNoChangeUiTest(noChangeUiTest: string) {
    this.noChangeUiTest = noChangeUiTest
    console.log('setNoChangeUiTest:', this.noChangeUiTest)
  }
}

export default new TestStore()