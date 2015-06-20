class Foobar

  DATA = [
    { id: 1, title: 'Foobar 1' },
    { id: 2, title: 'Foobar 2' },
    { id: 3, title: 'Foobar 3' },
    { id: 4, title: 'Foobar 4' },
  ]

  def self.query
    DATA
  end

  def self.get(id)
    (DATA.select{|d| d[:id] == id}).try :first
  end
end
