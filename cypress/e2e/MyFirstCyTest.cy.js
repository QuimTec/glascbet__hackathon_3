describe('My First Test', () => {

    it('Does not do much!', () => {
      expect(true).to.equal(true)
    })

    it('Does not do much!2', () => {
        expect(true).to.equal(true)
      })

    it('Does not do much!2 fail', () => {
        expect(true).to.equal(false)
      })
})