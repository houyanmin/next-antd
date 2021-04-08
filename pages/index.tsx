import React from "react";
import { GetStaticProps } from 'next'
import { HeartTwoTone, RightOutlined } from '@ant-design/icons';
import PageSearch from "@/components/PageSearch/index";
import Head from 'next/head'
import './Home.module.less'


const Home: React.FC<any> = (props: any): JSX.Element => {

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="早蝶数据支持微信视频号查找，多维度数据分析，热门视频、话题趋势追踪，热门榜单，挂链分析，视频监测，视频号直播数据分析等功能，助力视频号运营创作。" />
        <meta name="keywords" content="早蝶,早蝶数据,视频号,视频号数据,视频号数据分析,视频号运营,视频号搜索,视频号监测,视频号直播,视频号点赞,视频10万赞,视频号直播带货,视频号变现,视频号榜单,视频号排行榜" />
        <title>早蝶数据 - 视频号数据分析平台</title>
      </Head>
      <div className="page-home">
        <div className="banner-box">
          <div className="banner-content">
            <div className="title">视频号数据分析平台</div>
            <div className="desc">视号管家-让视频号运营管理更简单</div>
            <PageSearch class="index-search" page="index" />
          </div>
          <div className="fix-box">
            <div className="item">
              <span className="icon-img i-target"></span>
              <div className="info">视频号搜索 精准查找</div>
            </div>
            <div className="item">
              <span className="icon-img i-fenxi"></span>
              <div className="info">细分行业 分析全面</div>
            </div>
            <div className="item">
              <span className="icon-img i-data"></span>
              <div className="info">多项数据 解析账号</div>
            </div>
            <div className="item">
              <span className="icon-img i-hot"></span>
              <div className="info">了解最新热门视频话题</div>
            </div>
          </div>
        </div>
        <div className="layout-content">
          <div className="circle"></div>
          <div className="circle2"></div>
          <div className="rect"></div>
          <div className="rect2"></div>
          <div className="rect3"></div>
          <div className="content">
            <div className="rank">
              <div className="rank-center">
                <span className="icon-img i-rank"></span>
                <div className="desc-title">视频号榜单</div>
              </div>
            </div>
            <div className="category">
              <div className="item">
                <div className="item-tit">
                  <div className="txt">互联网</div>
                  <span className="more">查看更多<RightOutlined /></span>
                </div>
                <div className="item-con">
                  <table>
                    <thead>
                      <tr>
                        <th>排名</th>
                        <th>视频号</th>
                        <th>作品数</th>
                        <th>总点赞数</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <span className="icon-rank-numer rank1">1</span>
                        </td>
                        <td>
                          <div className="img-txt">
                            <img src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                            <div>asdfasdfasdfasd</div>
                          </div>
                        </td>
                        <td>454151</td>
                        <td>13656.35w</td>
                      </tr>
                      <tr>
                        <td><span className="icon-rank-numer rank2">2</span></td>
                        <td>
                          <div className="img-txt">
                            <img src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                            <div>asdfasdfasdfasd</div>
                          </div>
                        </td>
                        <td>454151</td>
                        <td>13656.35w</td>
                      </tr>
                      <tr>
                        <td><span className="icon-rank-numer rank3">3</span></td>
                        <td>
                          <div className="img-txt">
                            <img src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                            <div>asdfasdfasdfasd</div>
                          </div>
                        </td>
                        <td>454151</td>
                        <td>13656.35w</td>
                      </tr>
                      <tr>
                        <td><span className="icon-rank-numer rank-other">4</span></td>
                        <td>
                          <div className="img-txt">
                            <img src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                            <div>asdfasdfasdfasd</div>
                          </div>
                        </td>
                        <td>454151</td>
                        <td>13656.35w</td>
                      </tr>
                      <tr>
                        <td><span className="icon-rank-numer rank-other">5</span></td>
                        <td>
                          <div className="img-txt">
                            <img src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                            <div>asdfasdfasdfasd</div>
                          </div>
                        </td>
                        <td>454151</td>
                        <td>13656.35w</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="item">
                <div className="item-tit">
                  <div className="txt">科技</div>
                  <span className="more">查看更多<RightOutlined /></span>
                </div>
                <div className="item-con">
                  <table>
                    <thead>
                      <tr>
                        <th>排名</th>
                        <th>视频号</th>
                        <th>作品数</th>
                        <th>总点赞数</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <span className="icon-rank-numer rank1">1</span>
                        </td>
                        <td>
                          <div className="img-txt">
                            <img src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                            <div>asdfasdfasdfasd</div>
                          </div>
                        </td>
                        <td>454151</td>
                        <td>13656.35w</td>
                      </tr>
                      <tr>
                        <td><span className="icon-rank-numer rank2">2</span></td>
                        <td>
                          <div className="img-txt">
                            <img src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                            <div>asdfasdfasdfasd</div>
                          </div>
                        </td>
                        <td>454151</td>
                        <td>13656.35w</td>
                      </tr>
                      <tr>
                        <td><span className="icon-rank-numer rank3">3</span></td>
                        <td>
                          <div className="img-txt">
                            <img src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                            <div>asdfasdfasdfasd</div>
                          </div>
                        </td>
                        <td>454151</td>
                        <td>13656.35w</td>
                      </tr>
                      <tr>
                        <td><span className="icon-rank-numer rank-other">4</span></td>
                        <td>
                          <div className="img-txt">
                            <img src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                            <div>asdfasdfasdfasd</div>
                          </div>
                        </td>
                        <td>454151</td>
                        <td>13656.35w</td>
                      </tr>
                      <tr>
                        <td><span className="icon-rank-numer rank-other">5</span></td>
                        <td>
                          <div className="img-txt">
                            <img src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                            <div>asdfasdfasdfasd</div>
                          </div>
                        </td>
                        <td>454151</td>
                        <td>13656.35w</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="item">
                <div className="item-tit">
                  <div className="txt">科普</div>
                  <span className="more">查看更多<RightOutlined /></span>
                </div>
                <div className="item-con">
                  <table>
                    <thead>
                      <tr>
                        <th>排名</th>
                        <th>视频号</th>
                        <th>作品数</th>
                        <th>总点赞数</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <span className="icon-rank-numer rank1">1</span>
                        </td>
                        <td>
                          <div className="img-txt">
                            <img src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                            <div>asdfasdfasdfasd</div>
                          </div>
                        </td>
                        <td>454151</td>
                        <td>13656.35w</td>
                      </tr>
                      <tr>
                        <td><span className="icon-rank-numer rank2">2</span></td>
                        <td>
                          <div className="img-txt">
                            <img src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                            <div>asdfasdfasdfasd</div>
                          </div>
                        </td>
                        <td>454151</td>
                        <td>13656.35w</td>
                      </tr>
                      <tr>
                        <td><span className="icon-rank-numer rank3">3</span></td>
                        <td>
                          <div className="img-txt">
                            <img src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                            <div>asdfasdfasdfasd</div>
                          </div>
                        </td>
                        <td>454151</td>
                        <td>13656.35w</td>
                      </tr>
                      <tr>
                        <td><span className="icon-rank-numer rank-other">4</span></td>
                        <td>
                          <div className="img-txt">
                            <img src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                            <div>asdfasdfasdfasd</div>
                          </div>
                        </td>
                        <td>454151</td>
                        <td>13656.35w</td>
                      </tr>
                      <tr>
                        <td><span className="icon-rank-numer rank-other">5</span></td>
                        <td>
                          <div className="img-txt">
                            <img src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                            <div>asdfasdfasdfasd</div>
                          </div>
                        </td>
                        <td>454151</td>
                        <td>13656.35w</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="hot-box">
              <div className="hot-video-box">
                <div className="hot-item-tit">
                  <div className="txt">热门视频</div>
                  <span className="more">查看更多<RightOutlined /></span>
                </div>
                <div className="hot-item-con">
                  <div className="hot-img-txt">
                    <img className="cover" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                    <div className="wrap">
                      <div>此处是视频名称</div>
                      <div className="img-txt">
                        <img src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                        <div>此处是视频号名称</div>
                      </div>
                      <div className="about">
                        昨天 15:30 <span className="r-con"><HeartTwoTone twoToneColor="#eb2f96" /> 10万+</span>
                      </div>
                    </div>
                  </div>
                  <div className="hot-img-txt">
                    <img className="cover" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                    <div className="wrap">
                      <div>此处是视频名称</div>
                      <div className="img-txt">
                        <img src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                        <div>此处是视频号名称</div>
                      </div>
                      <div className="about">
                        昨天 15:30 <span className="r-con"><HeartTwoTone twoToneColor="#eb2f96" /> 10万+</span>
                      </div>
                    </div>
                  </div>
                  <div className="hot-img-txt">
                    <img className="cover" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                    <div className="wrap">
                      <div>此处是视频名称</div>
                      <div className="img-txt">
                        <img src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                        <div>此处是视频号名称</div>
                      </div>
                      <div className="about">
                        昨天 15:30 <span className="r-con"><HeartTwoTone twoToneColor="#eb2f96" /> 10万+</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="hot-topic-box">
              <div className="hot-item-tit">
                  <div className="txt">热门话题</div>
                  <span className="more">查看更多<RightOutlined /></span>
                </div>
                <div className="hot-item-con">
                  <div className="row">
                    <div className="flex-icon-txt" style={{ width: 200 }}><span className="iconfont icon-huati1"></span>此处是话题名称</div>
                    <div style={{ width: 130 }}>参与人数 1231</div>
                    <div style={{ width: 130 }}>视频数 1.7w</div>
                    <div><HeartTwoTone twoToneColor="#eb2f96" /> 400.5w</div>
                  </div>
                  <div className="row">
                    <div className="flex-icon-txt" style={{ width: 200 }}><span className="iconfont icon-huati1"></span>此处是话题名称</div>
                    <div style={{ width: 130 }}>参与人数 1231</div>
                    <div style={{ width: 130 }}>视频数 1.7w</div>
                    <div><HeartTwoTone twoToneColor="#eb2f96" /> 400.5w</div>
                  </div>
                  <div className="row">
                    <div className="flex-icon-txt" style={{ width: 200 }}><span className="iconfont icon-huati1"></span>此处是话题名称</div>
                    <div style={{ width: 130 }}>参与人数 1231</div>
                    <div style={{ width: 130 }}>视频数 1.7w</div>
                    <div><HeartTwoTone twoToneColor="#eb2f96" /> 400.5w</div>
                  </div>
                  <div className="row">
                    <div className="flex-icon-txt" style={{ width: 200 }}><span className="iconfont icon-huati1"></span>此处是话题名称</div>
                    <div style={{ width: 130 }}>参与人数 1231</div>
                    <div style={{ width: 130 }}>视频数 1.7w</div>
                    <div><HeartTwoTone twoToneColor="#eb2f96" /> 400.5w</div>
                  </div>
                  <div className="row">
                    <div className="flex-icon-txt" style={{ width: 200 }}><span className="iconfont icon-huati1"></span>此处是话题名称</div>
                    <div style={{ width: 130 }}>参与人数 1231</div>
                    <div style={{ width: 130 }}>视频数 1.7w</div>
                    <div><HeartTwoTone twoToneColor="#eb2f96" /> 400.5w</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="part1">
              <div className="watermark">01</div>
              <div className="l-con">
                <div className="tit">多维度监控</div>
                <div className="wrap">
                  <div className="item">
                    <div className="item-tit">基于行业分类细分全网最热博主</div>
                    <div className="item-desc">让你充分了解所处领域竞争力，及时发现优质潜力达人</div>
                  </div>
                  <div className="item">
                    <div className="item-tit">热门视频</div>
                    <div className="item-desc">实时更新爆款内容，追赶热点获取更多优质流量</div>
                  </div>
                  {/* <div className="item">
                    <div>直播广场</div>
                    <div>实时监控博主，第一时间掌握最新直播动态</div>
                  </div> */}
                </div>
              </div>
              <div className="r-con">
                <img src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
              </div>
            </div>
            <div className="part2">
              <div className="watermark">02</div>
              <div className="l-con">
                <img src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
              </div>
              <div className="r-con">
                <div className="tit">科学化数据分析</div>
                <div className="desc">视频号分析：多维度数据分析，了解账号点赞增长趋势，快速定位目标账号</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  return { props: {} }
}

export default Home;
