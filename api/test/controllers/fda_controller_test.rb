require 'test_helper'

class FdaControllerTest < ActionController::TestCase
  test 'should get index' do
    get :index
    assert_response :success
  end

  test 'should get get' do
    get :get
    assert_response :success
  end

  test 'should get show' do
    get :show
    assert_response :success
  end

  test 'should get update' do
    get :update
    assert_response :success
  end

  test 'should get delete' do
    get :delete
    assert_response :success
  end

  test 'should get create' do
    get :create
    assert_response :success
  end
end