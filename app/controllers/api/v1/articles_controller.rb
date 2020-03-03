class Api::V1::ArticlesController < ApplicationController
  def index
    article= Article.all.order(created_at: :desc)
    render json: article
  end

  def create
    article= Article.create!(article_params)
    if article 
      render json: article
    else 
      render json: article.errors
    end
  end

  def show
    if article 
      render json: article
    else
      render json: article.errors 
    end
  end

  def destroy
    article&.destroy
    render json: { message: 'You article is officially wiped from memory'}
  end

  private

  def article_parameters
    params.permit(:title, :body, :abstract, :image)
  end 

  def article 
    @article ||= Article.find(params[:id])
  end 
end
