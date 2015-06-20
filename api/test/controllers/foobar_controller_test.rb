require (File.dirname(File.realdirpath(__FILE__)) + '/../test_helper.rb')

class FoobarControllerTest < ActionController::TestCase
  # test "the truth" do
  #   assert true
  # end

  test 'should get index' do
    get :index

    assert_response :success
  end

  test 'should get show' do
    get :show, { id: 1 }

    assert_response :success
  end

  test 'should post create' do
    post :create, { id: 5, title: 'Foobar 5' }

    assert_response :success
  end

  test 'should put update' do
    put :update, { id: 5, title: 'Foobar 5!' }
    assert false
    assert_response :success
  end
end
