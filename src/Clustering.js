import React from 'react';
import './Jupyter/css/pygments/notebook/colorful.css';
import './Jupyter/css/notebook.css';
import './Jupyter/css/main.css';
import mapT from './img/mapT.PNG';
import can_after_clustering from './img/can_after_clustering.PNG';

function Clustering() {
  return (
    <React.StrictMode>
    <div class="container">
        <br/>
    <h2 ><strong>Segmenting and Clustering Neighborhoods in Toronto, Canada</strong></h2>
    <br/>
    <h4><strong>Introduction</strong></h4>
    
    <p>
    <br/>
    In this project, we will convert addresses into their equivalent latitude and longitude values. Also, we will use the Foursquare API to explore neighborhoods in Toronto, Canada. We will use the explore function to get the most common venue categories in each neighborhood, and then use this feature to group the neighborhoods into clusters. We will use the k-means clustering algorithm. Finally, we will use the Folium library to visualize the neighborhoods in North York, an administrative district in Toronto and their emerging clusters.
    </p>
    <br/>
    <br/>
    
    <div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[1]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span><span class="kn">import</span> <span class="nn">numpy</span> <span class="k">as</span> <span class="nn">np</span> <span class="c1"># library to handle data in a vectorized manner</span>
<br/>
<span class="kn">import</span> <span class="nn">pandas</span> <span class="k">as</span> <span class="nn">pd</span> <span class="c1"># library for data analsysis</span>
<br/>

<span class="kn">import</span> <span class="nn">json</span> <span class="c1"># library to handle JSON files</span>

<br/>

<span class="kn">import</span> <span class="nn">requests</span> <span class="c1"># library to handle requests</span>
<br/>
<span class="kn">from</span> <span class="nn">pandas.io.json</span> <span class="kn">import</span> <span class="n">json_normalize</span> 

<span class="c1"> # tranform JSON file into a pandas dataframe</span>
<br/>
<span class="kn">import</span> <span class="nn">matplotlib.cm</span> <span class="k">as</span> <span class="nn">cm</span>
<span class="c1"> # Matplotlib and associated plotting modules</span>
<br/>
<span class="kn">import</span> <span class="nn">matplotlib.colors</span> <span class="k">as</span> <span class="nn">colors</span>
<br/>
<span class="kn">import</span> <span class="nn">folium</span> <span class="c1"># map rendering library</span>
<br/>
<span class="kn">from</span> <span class="nn">bs4</span> <span class="kn">import</span> <span class="n">BeautifulSoup</span> 
<span class="c1"> # We will use this library to get our data by scraping it from wikepdia</span>
</pre></div>

    </div>
</div>
</div>
</div>
<br/>
<h4 id="1.-Download-and-Explore-Dataset">Download and Explore Dataset</h4>
<br/>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[2]:</div>
<div class="inner_cell">
    <div class="input_area">
    
<div class=" highlight hl-ipython3"><pre>
<span class="c1"> # scraping the data from wikepedia using the following url </span>
<br/>
    <span></span><span class="n">html</span> <span class="o">=</span> <span class="n">requests</span><span class="o">.</span><span class="n">get</span><span class="p">(</span><span class="">&#39;https://en.wikipedia.org/wiki/List_of_postal_codes_of_Canada:_M&#39;</span><span class="p">)</span><span class="o">.</span><span class="n">text</span>
</pre></div>

    </div>
</div>
</div>
<br/>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[3]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span><span class="n">soup</span> <span class="o">=</span> <span class="n">BeautifulSoup</span><span class="p">(</span><span class="n">html</span><span class="p">,</span> <span class="">&#39;html5lib&#39;</span><span class="p">)</span>
</pre></div>

    </div>
</div>
</div>
</div>
<br/>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[4]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre>
<span class="c1"> # Getting the table that contains the list of all the Neighborhoods in Toronto city. </span>
<br/>
    <span></span><span class="n">table_contents</span><span class="o">=</span><span class="p">[]</span>
<span class="n">table</span><span class="o">=</span><span class="n">soup</span><span class="o">.</span><span class="n">find</span><span class="p">(</span><span class="">&#39;table&#39;</span><span class="p">)</span>
<br/>
<span class="k">for</span> <span class="n">row</span> <span class="ow">in</span> <span class="n">table</span><span class="o">.</span><span class="n">findAll</span><span class="p">(</span><span class="">&#39;td&#39;</span><span class="p">):</span>
    <br/>
    <span class="n">    cell</span> <span class="o">=</span> <span class="p">&#123;&#125;</span>
    <br/>
    <span class="k">    if</span> <span class="n">row</span><span class="o">.</span><span class="n">span</span><span class="o">.</span><span class="n">text</span><span class="o">==</span><span class="">&#39;Not assigned&#39;</span><span class="p">:</span>
    <br/>    <span class="k">   pass</span>
    <br/>
    <span class="k">    else</span><span class="p">:</span>
    <br/>
        <span class="n">        cell</span><span class="p">[</span><span class="">&#39;PostalCode&#39;</span><span class="p">]</span> <span class="o">=</span> <span class="n">row</span><span class="o">.</span><span class="n">p</span><span class="o">.</span><span class="n">text</span><span class="p">[:</span><span class="mi">3</span><span class="p">]</span>
        <br/>
        <span class="n">        cell</span><span class="p">[</span><span class="">&#39;Borough&#39;</span><span class="p">]</span> <span class="o">=</span> <span class="p">(</span><span class="n">row</span><span class="o">.</span><span class="n">span</span><span class="o">.</span><span class="n">text</span><span class="p">)</span><span class="o">.</span><span class="n">split</span><span class="p">(</span><span class="">&#39;(&#39;</span><span class="p">)[</span><span class="mi">0</span><span class="p">]</span>
        <br/>
        <span class="n">        cell</span><span class="p">[</span><span class="">&#39;Neighborhood&#39;</span><span class="p">]</span> <span class="o">=</span> <span class="p">(((((</span><span class="n">row</span><span class="o">.</span><span class="n">span</span><span class="o">.</span><span class="n">text</span><span class="p">)</span><span class="o">.</span><span class="n">split</span><span class="p">(</span><span class="">&#39;(&#39;</span><span class="p">)[</span><span class="mi">1</span><span class="p">])</span><span class="o">.</span><span class="n">strip</span><span class="p">(</span><span class="">&#39;)&#39;</span><span class="p">))</span><span class="o">.</span><span class="n">replace</span><span class="p">(</span><span class="">&#39; /&#39;</span><span class="p">,</span><span class="">&#39;,&#39;</span><span class="p">))</span><span class="o">.</span><span class="n">replace</span><span class="p">(</span><span class="">&#39;)&#39;</span><span class="p">,</span><span class="">&#39; &#39;</span><span class="p">))</span><span class="o">.</span><span class="n">strip</span><span class="p">(</span><span class="">&#39; &#39;</span><span class="p">)</span>
        <br/>
        <span class="n">        table_contents</span><span class="o">.</span><span class="n">append</span><span class="p">(</span><span class="n">cell</span><span class="p">)</span>
        <br/>
<span class="c1"># print(table_contents)</span>
</pre></div>

    </div>
</div>
</div>

</div>
<br/>


<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[5]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre>
<span class="c1">#Renaming the columns as follow</span>
<br/>
    <span></span><span class="n">df</span><span class="o">=</span><span class="n">pd</span><span class="o">.</span><span class="n">DataFrame</span><span class="p">(</span><span class="n">table_contents</span><span class="p">)</span>
<br/>
<span class="n">df</span><span class="p">[</span><span class="">&#39;Borough&#39;</span><span class="p">]</span><span class="o">=</span><span class="n">df</span><span class="p">[</span><span class="">&#39;Borough&#39;</span><span class="p">]</span><span class="o">.</span><span class="n">replace</span><span class="p">(&#123;</span><span>&#39;Downtown TorontoStn A PO Boxes25 The Esplanade&#39;</span><span class="p">:</span><span >&#39;Downtown Toronto Stn A&#39;</span><span class="p">,<br/></span>                   
                                             <span >                                     &#39;East TorontoBusiness reply mail Processing Centre969 Eastern&#39;</span><span class="p">:</span><span>&#39;East Toronto Business&#39;</span><span class="p">,<br/></span>
                                             <span >                                     &#39;EtobicokeNorthwest&#39;</span><span class="p">:</span><span >&#39;Etobicoke Northwest&#39;</span><span class="p">,</span><span>&#39;East YorkEast Toronto&#39;</span><span class="p">:</span><span >&#39;East York/East Toronto&#39;</span><span class="p">,<br/></span>
                                             <span >                                     &#39;MississaugaCanada Post Gateway Processing Centre&#39;</span><span class="p">:</span><span >&#39;Mississauga&#39;</span><span class="p">&#125;)</span>
<br/>
df
</pre></div>

    </div>
</div>
</div>

</div>
<br/>


<div class="output_wrapper">
<div class="output">


<div class="output_area">

    <div class="prompt output_prompt">Out[1]:</div>



<div class="">
<div>

<table border="1" class="table">
  <thead class="table-dark">
    <tr >
      <th></th>
      <th>PostalCode</th>
      <th>Borough</th>
      <th>Neighborhood</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>M3A</td>
      <td>North York</td>
      <td>Parkwoods</td>
    </tr>
    <tr>
      <th>1</th>
      <td>M4A</td>
      <td>North York</td>
      <td>Victoria Village</td>
    </tr>
    <tr>
      <th>2</th>
      <td>M5A</td>
      <td>Downtown Toronto</td>
      <td>Regent Park, Harbourfront</td>
    </tr>
    <tr>
      <th>3</th>
      <td>M6A</td>
      <td>North York</td>
      <td>Lawrence Manor, Lawrence Heights</td>
    </tr>
    <tr>
      <th>4</th>
      <td>M7A</td>
      <td>Queen's Park</td>
      <td>Ontario Provincial Government</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>98</th>
      <td>M8X</td>
      <td>Etobicoke</td>
      <td>The Kingsway, Montgomery Road, Old Mill North</td>
    </tr>
    <tr>
      <th>99</th>
      <td>M4Y</td>
      <td>Downtown Toronto</td>
      <td>Church and Wellesley</td>
    </tr>
    <tr>
      <th>100</th>
      <td>M7Y</td>
      <td>East Toronto Business</td>
      <td>Enclave of M4L</td>
    </tr>
    <tr>
      <th>101</th>
      <td>M8Y</td>
      <td>Etobicoke</td>
      <td>Old Mill South, King's Mill Park, Sunnylea, Hu...</td>
    </tr>
    <tr>
      <th>102</th>
      <td>M8Z</td>
      <td>Etobicoke</td>
      <td>Mimico NW, The Queensway West, South of Bloor,...</td>
    </tr>
  </tbody>
</table>
<p>103 rows × 3 columns</p>
</div>
</div>

</div>

</div>
</div>

<br/>

<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[6]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre>
<span class="c1">#Loading a file that contains the mapping between Postal codes and their latitude/longitude in Toronto</span>
<br/>
<span class="c1"><strong>Important : </strong>In our case, the file Locations.csv exists in the same location as the current notebook</span>
<br/>
df_data_1 = pd.read_csv(&#39;Locations.csv&#39;)
<br/>
df_data_1.head()

    </pre></div>

    </div>
</div>
</div>
</div>
<br/>

<div class="output_wrapper">
<div class="output">


<div class="output_area">

    <div class="prompt output_prompt">Out[2]:</div>



<div class="">
<div>

<table border="1" class="table">
  <thead class="table-dark">
    <tr >
      <th></th>
      <th>Postal Code</th>
      <th>Latitude</th>
      <th>Longitude</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>M1B</td>
      <td>43.806686</td>
      <td>-79.194353</td>
    </tr>
    <tr>
      <th>1</th>
      <td>M1C</td>
      <td>43.784535</td>
      <td>-79.160497</td>
    </tr>
    <tr>
      <th>2</th>
      <td>M1E</td>
      <td>43.763573</td>
      <td>-79.188711</td>
    </tr>
    <tr>
      <th>3</th>
      <td>M1G</td>
      <td>43.770992</td>
      <td>-79.216917</td>
    </tr>
    <tr>
      <th>4</th>
      <td>M1H</td>
      <td>43.773136</td>
      <td>-79.239476</td>
    </tr>
  </tbody>
</table>
</div>
</div>

</div>

</div>
</div>

<br/>

<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[7]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre>
<span class="c1">#Adding the equivalent latitude and longitude values to our initial dataframe df</span>
<br/>
    <span></span><span class="n">newDF</span> <span class="o">=</span> <span class="n">pd</span><span class="o">.</span><span class="n">DataFrame</span><span class="p">([],</span> <span class="n">columns</span> <span class="o">=</span><span class="p">[</span><span class="">&#39;Latitude&#39;</span><span class="p">,</span><span class="">&#39;Longitude&#39;</span><span class="p">])</span>
<br/>
<span class="k">for</span> <span class="n">i</span> <span class="ow">in</span> <span class="nb">range</span><span class="p">(</span><span class="nb">len</span><span class="p">(</span><span class="n">df</span><span class="p">)):</span>
    <br/>
    <span class="n">    row</span> <span class="o">=</span> <span class="n">df_data_1</span><span class="o">.</span><span class="n">loc</span><span class="p">[</span><span class="n">df_data_1</span><span class="p">[</span><span class="">&#39;Postal Code&#39;</span><span class="p">]</span> <span class="o">==</span> <span class="n">df</span><span class="o">.</span><span class="n">iloc</span><span class="p">[</span><span class="n">i</span><span class="p">][</span><span class="mi">0</span><span class="p">]]</span>
    <br/>
    <span class="n">    l</span> <span class="o">=</span> <span class="n">row</span><span class="p">[[</span><span class="">&#39;Latitude&#39;</span><span class="p">,</span><span class="">&#39;Longitude&#39;</span><span class="p">]]</span>
    <br/>
    <span class="n">    newDF</span><span class="o">.</span><span class="n">loc</span><span class="p">[</span><span class="n">newDF</span><span class="o">.</span><span class="n">shape</span><span class="p">[</span><span class="mi">0</span><span class="p">]]</span> <span class="o">=</span> <span class="p">[</span><span class="n">l</span><span class="o">.</span><span class="n">iloc</span><span class="p">[</span><span class="mi">0</span><span class="p">,</span><span class="mi">0</span><span class="p">],</span><span class="n">l</span><span class="o">.</span><span class="n">iloc</span><span class="p">[</span><span class="mi">0</span><span class="p">,</span><span class="mi">1</span><span class="p">]]</span>
    <br/>
<span class="n">df</span><span class="p">[</span><span class="">&#39;Latitude&#39;</span><span class="p">]</span> <span class="o">=</span> <span class="n">newDF</span><span class="p">[</span><span class="">&#39;Latitude&#39;</span><span class="p">]</span>
<br/>
<span class="n">df</span><span class="p">[</span><span class="">&#39;Longitude&#39;</span><span class="p">]</span> <span class="o">=</span> <span class="n">newDF</span><span class="p">[</span><span class="">&#39;Longitude&#39;</span><span class="p">]</span>
</pre></div>

    </div>
</div>
</div>

</div>
<br/>
<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div><div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<p>Quickly examine the resulting dataframe.</p>

</div>
</div>
</div>

<br/>

<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[8]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span><span class="n">df</span><span class="o">.</span><span class="n">head</span><span class="p">(</span><span class="mi">100</span><span class="p">)</span>
</pre></div>

    </div>
</div>
</div>
<br/>
<div class="output_wrapper">
<div class="output">


<div class="output_area">

    <div class="prompt output_prompt">Out[3]:</div>



<div class="output_html rendered_html output_subarea output_execute_result">
<div>

<table border="1" class="table">
  <thead class="table-dark">
    <tr >
      <th></th>
      <th>PostalCode</th>
      <th>Borough</th>
      <th>Neighborhood</th>
      <th>Latitude</th>
      <th>Longitude</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>M3A</td>
      <td>North York</td>
      <td>Parkwoods</td>
      <td>43.753259</td>
      <td>-79.329656</td>
    </tr>
    <tr>
      <th>1</th>
      <td>M4A</td>
      <td>North York</td>
      <td>Victoria Village</td>
      <td>43.725882</td>
      <td>-79.315572</td>
    </tr>
    <tr>
      <th>2</th>
      <td>M5A</td>
      <td>Downtown Toronto</td>
      <td>Regent Park, Harbourfront</td>
      <td>43.654260</td>
      <td>-79.360636</td>
    </tr>
    <tr>
      <th>3</th>
      <td>M6A</td>
      <td>North York</td>
      <td>Lawrence Manor, Lawrence Heights</td>
      <td>43.718518</td>
      <td>-79.464763</td>
    </tr>
    <tr>
      <th>4</th>
      <td>M7A</td>
      <td>Queen's Park</td>
      <td>Ontario Provincial Government</td>
      <td>43.662301</td>
      <td>-79.389494</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>95</th>
      <td>M1X</td>
      <td>Scarborough</td>
      <td>Upper Rouge</td>
      <td>43.836125</td>
      <td>-79.205636</td>
    </tr>
    <tr>
      <th>96</th>
      <td>M4X</td>
      <td>Downtown Toronto</td>
      <td>St. James Town, Cabbagetown</td>
      <td>43.667967</td>
      <td>-79.367675</td>
    </tr>
    <tr>
      <th>97</th>
      <td>M5X</td>
      <td>Downtown Toronto</td>
      <td>First Canadian Place, Underground city</td>
      <td>43.648429</td>
      <td>-79.382280</td>
    </tr>
    <tr>
      <th>98</th>
      <td>M8X</td>
      <td>Etobicoke</td>
      <td>The Kingsway, Montgomery Road, Old Mill North</td>
      <td>43.653654</td>
      <td>-79.506944</td>
    </tr>
    <tr>
      <th>99</th>
      <td>M4Y</td>
      <td>Downtown Toronto</td>
      <td>Church and Wellesley</td>
      <td>43.665860</td>
      <td>-79.383160</td>
    </tr>
  </tbody>
</table>
<p>100 rows × 5 columns</p>
</div>
</div>

</div>

</div>
</div>

</div>
<br/>

<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[9]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre>
    <span class="c1"># define the dataframe neighborhoods</span>
    <br/>
    <span></span><span class="n">neighborhoods</span> <span class="o">=</span> <span class="n">df</span><span class="p">[[</span><span class="">&#39;Borough&#39;</span><span class="p">,</span><span class="">&#39;Neighborhood&#39;</span><span class="p">,</span><span class="">&#39;Latitude&#39;</span><span class="p">,</span><span class="">&#39;Longitude&#39;</span><span class="p">]]</span>
<br/>
</pre></div>

    </div>
</div>
</div>
</div>
<br/>
<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div><div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<h5 id="Create-a-map-of-New-York-with-neighborhoods-superimposed-on-top.">Create a map of Toronto York with neighborhoods superimposed on top.</h5>
</div>
</div>
</div>
<br/>

<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div><div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
</div>
</div>
</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[10]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span><span class="c1"># create map of North York using latitude and longitude values</span>
<br/>
<span class="n">map_toronto</span> <span class="o">=</span> <span class="n">folium</span><span class="o">.</span><span class="n">Map</span><span class="p">(</span><span class="n">location</span><span class="o">=</span><span class="p">[</span><span class="mf">43.753259</span><span class="p">,</span> <span class="o">-</span><span class="mf">79.329656</span><span class="p">],</span> <span class="n">zoom_start</span><span class="o">=</span><span class="mi">10</span><span class="p">)</span>
<br/>
<span class="c1"># add markers to map</span>
<br/>
<span class="k">for</span> <span class="n">lat</span><span class="p">,</span> <span class="n">lng</span><span class="p">,</span> <span class="n">borough</span><span class="p">,</span> <span class="n">neighborhood</span> <span class="ow">in</span> <span class="nb">zip</span><span class="p">(</span><span class="n">neighborhoods</span><span class="p">[</span><span class="">&#39;Latitude&#39;</span><span class="p">],</span> <span class="n">neighborhoods</span><span class="p">[</span><span class="">&#39;Longitude&#39;</span><span class="p">],</span> <span class="n">neighborhoods</span><span class="p">[</span><span class="">&#39;Borough&#39;</span><span class="p">],</span> <span class="n">neighborhoods</span><span class="p">[</span><span class="">&#39;Neighborhood&#39;</span><span class="p">]):</span>
<br/>
    <span class="n">    label</span> <span class="o">=</span> <span class="">&#39;</span><span class="si">&#123;&#125;</span><span class="">, </span><span class="si">&#123;&#125;</span><span class="">&#39;</span><span class="o">.</span><span class="n">format</span><span class="p">(</span><span class="n">neighborhood</span><span class="p">,</span> <span class="n">borough</span><span class="p">)</span>
    <br/>
    <span class="n">    label</span> <span class="o">=</span> <span class="n">folium</span><span class="o">.</span><span class="n">Popup</span><span class="p">(</span><span class="n">label</span><span class="p">,</span> <span class="n">parse_html</span><span class="o">=</span><span class="kc">True</span><span class="p">)</span>
    <br/>
    <span class="n">    folium</span><span class="o">.</span><span class="n">CircleMarker</span><span class="p">(</span>
        <br/>
        <span class="p">        [</span><span class="n">lat</span><span class="p">,</span> <span class="n">lng</span><span class="p">],</span>
        <br/>
        <span class="n">        radius</span><span class="o">=</span><span class="mi">5</span><span class="p">,</span>
        <br/>
        <span class="n">        popup</span><span class="o">=</span><span class="n">label</span><span class="p">,</span>
        <br/>
        <span class="n">        color</span><span class="o">=</span><span class="">&#39;blue&#39;</span><span class="p">,</span>
        <br/>
        <span class="n">        fill</span><span class="o">=</span><span class="kc">True</span><span class="p">,</span>
        <br/>
        <span class="n">        fill_color</span><span class="o">=</span><span class="">&#39;#3186cc&#39;</span><span class="p">,</span>
        <br/>
        <span class="n">        fill_opacity</span><span class="o">=</span><span class="mf">0.7</span><span class="p">,</span>
        <br/>
        <span class="n">        parse_html</span><span class="o">=</span><span class="kc">False</span><span class="p">)</span><span class="o">.</span><span class="n">add_to</span><span class="p">(</span><span class="n">map_toronto</span><span class="p">)</span>  
    <br/>
<span class="n">map_toronto<br/></span>
<br/>
</pre></div>

    </div>
</div>
</div>
</div>

<br/>


<div class="output_wrapper">
<div class="output">


<div class="output_area">

    <div class="prompt output_prompt">Out[4]:</div>



<div class="output_html rendered_html output_subarea output_execute_result">
<img src={mapT} width={'100%'}/>
</div>
</div>
</div>
</div>

<br/>

<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div><div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<p>Next, we are going to start utilizing the Foursquare API to explore the neighborhoods and segment them.</p>
<br/>
<p>For illustration purposes, we will segment and cluster only the neighborhoods in North York. So let's slice the original dataframe and create a new dataframe of the Manhattan data.</p>
<br/>
</div>
</div>
</div>

<br/>

<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[11]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span><span class="n">northY_data</span> <span class="o">=</span> <span class="n">neighborhoods</span><span class="p">[</span><span class="n">neighborhoods</span><span class="p">[</span><span class="">&#39;Borough&#39;</span><span class="p">]</span> <span class="o">==</span> <span class="">&#39;North York&#39;</span><span class="p">]</span><span class="o">.</span><span class="n">reset_index</span><span class="p">(</span><span class="n">drop</span><span class="o">=</span><span class="kc">True</span><span class="p">)</span>
<br/>
</pre></div>

    </div>
</div>
</div>
</div>

<br/>
<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div><div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<h5>Define Foursquare Credentials and Version.</h5>
<br/>

</div>
</div>
</div>


<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[12]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span><span class="c1"># @hidden_cell</span>
<br/>
<span class="n">CLIENT_ID</span> <span class="o">=</span> <span class="">&#39;....&#39;</span> <span class="c1"># Foursquare ID</span>
<br/>
<span class="n">CLIENT_SECRET</span> <span class="o">=</span> <span class="">&#39;....&#39;</span> <span class="c1"># Foursquare Secret</span>
</pre></div>

    </div>
</div>
</div>

</div>
<br/>

<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[13]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span><span class="n">VERSION</span> <span class="o">=</span> <span class="">&#39;20180605&#39;</span> <span class="c1"># Foursquare API version</span>
<br/>
<span class="n">LIMIT</span> <span class="o">=</span> <span class="mi">100</span> <span class="c1"># A default Foursquare API limit value</span>
<br/>
<span class="nb">print</span><span class="p">(</span><span class="">&#39;Credentails:&#39;</span><span class="p">)</span>
<br/>
<span class="nb">print</span><span class="p">(</span><span class="">&#39;CLIENT_ID: &#39;</span> <span class="o">+</span> <span class="n">CLIENT_ID</span><span class="p">)</span>
<br/>
<span class="nb">print</span><span class="p">(</span><span class="">&#39;CLIENT_SECRET:&#39;</span> <span class="o">+</span> <span class="n">CLIENT_SECRET</span><span class="p">)</span>
</pre></div>

    </div>
</div>
</div>
</div>

<br/>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[14]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre>
    <span class='c1'>Get the neighborhood's latitude and longitude values.</span>
<br/>
    <span></span><span class="n">neighborhood_latitude</span> <span class="o">=</span> <span class="n">northY_data</span><span class="o">.</span><span class="n">loc</span><span class="p">[</span><span class="mi">0</span><span class="p">,</span> <span class="">&#39;Latitude&#39;</span><span class="p">]</span> <span class="c1"># neighborhood latitude value</span>
<br/>
<span class="n">neighborhood_longitude</span> <span class="o">=</span> <span class="n">northY_data</span><span class="o">.</span><span class="n">loc</span><span class="p">[</span><span class="mi">0</span><span class="p">,</span> <span class="">&#39;Longitude&#39;</span><span class="p">]</span> <span class="c1"># neighborhood longitude value</span>
<br/>
<span class="n">neighborhood_name</span> <span class="o">=</span> <span class="n">northY_data</span><span class="o">.</span><span class="n">loc</span><span class="p">[</span><span class="mi">0</span><span class="p">,</span> <span class="">&#39;Neighborhood&#39;</span><span class="p">]</span> <span class="c1"># neighborhood name</span>
<br/>
<span class="nb">print</span><span class="p">(</span><span class="">&#39;Latitude and longitude values of </span><span class="si">{}</span><span class=""> are </span><span class="si">{}</span><span class="">, </span><span class="si">{}</span><span class="">.&#39;</span><span class="o">.</span><span class="n">format</span><span class="p">(</span><span class="n">neighborhood_name</span><span class="p">,</span> 
                                                               <span class="n">neighborhood_latitude</span><span class="p">,</span> 
                                                               <span class="n">neighborhood_longitude</span><span class="p">))</span>
</pre></div>

    </div>
</div>
</div>
</div>

<br/>

<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div><div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<h5 id="Now,-let's-get-the-top-100-venues-that-are-in-Marble-Hill-within-a-radius-of-500-meters.">Now, let's get the top 100 venues that are in Parkwoods within a radius of 500 meters.</h5>
</div>
</div>
</div>

<br/>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[15]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span><span class="c1"># Let's create the GET request URL.</span>
<br/>
<span class="n">radius</span> <span class="o">=</span> <span class="mi">500</span> <span class="c1"># define radius</span>
<br/>
<span class="n">url</span> <span class="o">=</span> <span class="">&#39;https://api.foursquare.com/v2/venues/explore?&amp;client_id=</span><span class="si">{}</span><span class="">&amp;client_secret=</span><span class="si">{}</span><span class="">&amp;v=</span><span class="si">{}</span><span class="">&amp;ll=</span><span class="si">{}</span><span class="">,</span><span class="si">{}</span><span class="">&amp;radius=</span><span class="si">{}</span><span class="">&amp;limit=</span><span class="si">{}</span><span class="">&#39;</span><span class="o">.</span><span class="n">format</span><span class="p">(</span>
<br/>
    <span class="n">    CLIENT_ID</span><span class="p">,</span> 
    <br/>
    <span class="n">    CLIENT_SECRET</span><span class="p">,</span> 
    <br/>
    <span class="n">    VERSION</span><span class="p">,</span> 
    <br/>
    <span class="n">    neighborhood_latitude</span><span class="p">,</span> 
    <br/>
    <span class="n">    neighborhood_longitude</span><span class="p">,</span> 
    <br/>
    <span class="n">    radius</span><span class="p">,</span> 
    <span class="n">LIMIT</span><span class="p">)</span>
    <br/>

</pre></div>

    </div>
</div>
</div>
</div>

<br/>

<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[16]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre>
    <span class='c1'>Sending a GET request and examining the resutls</span>
    <br/>
    <span></span><span class="n">results</span> <span class="o">=</span> <span class="n">requests</span><span class="o">.</span><span class="n">get</span><span class="p">(</span><span class="n">url</span><span class="p">)</span><span class="o">.</span><span class="n">json</span><span class="p">()</span>
<br/>
<span class="n">results</span>
</pre></div>

    </div>
</div>
</div>
</div>


<br/>

<div class="output_wrapper">
<div class="output">


<div class="output_area">

    <div class="prompt output_prompt">Out[5]:</div>




<div class="output_text output_subarea output_execute_result">
<pre>&#123;&#39;meta&#39;: &#123;&#39;code&#39;: 200, &#39;requestId&#39;: &#39;6144947edc6d5c2d0a0831f4&#39;&#125;,<br/>
 &#39;response&#39;: &#123;&#39;headerLocation&#39;: &#39;Parkwoods - Donalda&#39;,<br/>
 <span>  </span>&#39;headerFullLocation&#39;: &#39;Parkwoods - Donalda, Toronto&#39;,<br/>
 <span>  </span>&#39;headerLocationGranularity&#39;: &#39;neighborhood&#39;,<br/>
 <span>  </span>&#39;totalResults&#39;: 4,<br/>
 <span>  </span>&#39;suggestedBounds&#39;: &#123;&#39;ne&#39;: &#123;&#39;lat&#39;: 43.757758604500005,<br/>
 <span>    </span>&#39;lng&#39;: -79.32343823984928&#125;,<br/>
 <span>    </span>&#39;sw&#39;: &#123;&#39;lat&#39;: 43.7487585955, &#39;lng&#39;: -79.33587476015072&#125;&#125;,<br/>
 <span>  </span>&#39;groups&#39;: [&#123;&#39;type&#39;: &#39;Recommended Places&#39;,<br/>
    <span>    </span>&#39;name&#39;: &#39;recommended&#39;,<br/>
    <span>    </span>&#39;items&#39;: [&#123;&#39;reasons&#39;: &#123;&#39;count&#39;: 0,<br/>
        <span>      </span>&#39;items&#39;: [&#123;&#39;summary&#39;: &#39;This spot is popular&#39;,<br/>
            <span>      </span>&#39;type&#39;: &#39;general&#39;,<br/>
            <span>      </span>&#39;reasonName&#39;: &#39;globalInteractionReason&#39;&#125;]&#125;,<br/>
            <span>    </span>&#39;venue&#39;: &#123;&#39;id&#39;: &#39;4e8d9dcdd5fbbbb6b3003c7b&#39;,<br/>
            <span>      </span>&#39;name&#39;: &#39;Brookbanks Park&#39;,<br/>
       ...</pre>
</div>

</div>

</div>
</div>

<br/>
<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div><div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<p>We will create a function <strong>get_category_type</strong> which get a dictionary as input and return the category of a given venue.</p>

</div>
</div>
</div>
<br/>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[17]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span><span class="c1"># function that extracts the category of the venue</span>
<br/>
<span class="k">def</span> <span class="nf">get_category_type</span><span class="p">(</span><span class="n">row</span><span class="p">):</span>
    <br/>
    <span class="k">    try</span><span class="p"> :</span>
    <br/>
        <span class="n">        categories_list</span> <span class="o">=</span> <span class="n">row</span><span class="p">[</span><span class="">&#39;categories&#39;</span><span class="p">]</span>
        <br/>
    <span class="k">    except</span><span class="p">:</span>
    <br/>
        <span class="n">        categories_list</span> <span class="o">=</span> <span class="n">row</span><span class="p">[</span><span class="">&#39;venue.categories&#39;</span><span class="p">]</span>
        <br/>
    <span class="k">    if</span> <span class="nb">len</span><span class="p">(</span><span class="n">categories_list</span><span class="p">)</span> <span class="o">==</span> <span class="mi">0</span><span class="p">:</span>
    <br/>
        <span class="k">        return</span> <span class="kc">None</span>
        <br/>
    <span class="k">    else</span><span class="p">:</span>
    <br/>
        <span class="k">        return</span> <span class="n">categories_list</span><span class="p">[</span><span class="mi">0</span><span class="p">][</span><span class="">&#39;name&#39;</span><span class="p">]</span>
</pre></div>

    </div>
</div>
</div>

</div>


<br/>
<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div><div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<p>Now we are ready to clean the json and structure it into a pandas dataframe.</p>
</div>
</div>
</div>
<br/>


<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[18]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre>
<span class="n">venues</span> <span class="o">=</span> <span class="n">results</span><span class="p">[</span><span class="">&#39;response&#39;</span><span class="p">][</span><span class="">&#39;groups&#39;</span><span class="p">][</span><span class="mi">0</span><span class="p">][</span><span class="">&#39;items&#39;</span><span class="p">]</span>
 <br/>   
<span class="n">nearby_venues</span> <span class="o">=</span> <span class="n">json_normalize</span><span class="p">(</span><span class="n">venues</span><span class="p">)</span> <span class="c1"># flatten JSON</span>
<br/>   
<span class="c1"># filter columns</span>
<br/>   
<span class="n">filtered_columns</span> <span class="o">=</span> <span class="p">[</span><span class="">&#39;venue.name&#39;</span><span class="p">,</span> <span class="">&#39;venue.categories&#39;</span><span class="p">,</span> <span class="">&#39;venue.location.lat&#39;</span><span class="p">,</span> <span class="">&#39;venue.location.lng&#39;</span><span class="p">]</span>
<br/>   
<span class="n">nearby_venues</span> <span class="o">=</span><span class="n">nearby_venues</span><span class="o">.</span><span class="n">loc</span><span class="p">[:,</span> <span class="n">filtered_columns</span><span class="p">]</span>
<br/>   
<span class="c1"># filter the category for each row</span>
<br/>   
<span class="n">nearby_venues</span><span class="p">[</span><span class="">&#39;venue.categories&#39;</span><span class="p">]</span> <span class="o">=</span> <span class="n">nearby_venues</span><span class="o">.</span><span class="n">apply</span><span class="p">(</span><span class="n">get_category_type</span><span class="p">,</span> <span class="n">axis</span><span class="o">=</span><span class="mi">1</span><span class="p">)</span>
<br/>   
<span class="c1"># clean columns</span>
<br/>   
<span class="n">nearby_venues</span><span class="o">.</span><span class="n">columns</span> <span class="o">=</span> <span class="p">[</span><span class="n">col</span><span class="o">.</span><span class="n">split</span><span class="p">(</span><span class="s2">&quot;.&quot;</span><span class="p">)[</span><span class="o">-</span><span class="mi">1</span><span class="p">]</span> <span class="k">for</span> <span class="n">col</span> <span class="ow">in</span> <span class="n">nearby_venues</span><span class="o">.</span><span class="n">columns</span><span class="p">]</span>
<br/>   
<span class="n">nearby_venues</span><span class="o">.</span><span class="n">head</span><span class="p">()</span>
</pre></div>

    </div>
</div>
</div>

</div>

<br/>
<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div><div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<h5>Exploring the Neighborhoods in Parkwoods</h5>
<br/>
<p>Let's create a function to repeat the same process to all the neighborhoods in Parkwoods</p>
</div>
</div>
</div>

<br/>

<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[19]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span><span class="k">def</span> <span class="nf">getNearbyVenues</span><span class="p">(</span><span class="n">names</span><span class="p">,</span> <span class="n">latitudes</span><span class="p">,</span> <span class="n">longitudes</span><span class="p">,</span> <span class="n">radius</span><span class="o">=</span><span class="mi">500</span><span class="p">):</span>
    <br/>
    <span class="n">    venues_list</span><span class="o">=</span><span class="p">[]</span>
    <br/>
    <span class="k">    for</span> <span class="n">name</span><span class="p">,</span> <span class="n">lat</span><span class="p">,</span> <span class="n">lng</span> <span class="ow">in</span> <span class="nb">zip</span><span class="p">(</span><span class="n">names</span><span class="p">,</span> <span class="n">latitudes</span><span class="p">,</span> <span class="n">longitudes</span><span class="p">):</span>
    <br/>
        <span class="nb">       print</span><span class="p">(</span><span class="n">name</span><span class="p">)</span>
        <br/>   
        <span class="c1">       # create the API request URL</span>
        <br/>
        <span class="n">       url</span> <span class="o">=</span> <span class="">&#39;https://api.foursquare.com/v2/venues/explore?&amp;client_id=</span><span class="si">{}</span><span class="">&amp;client_secret=</span><span class="si">{}</span><span class="">&amp;v=</span><span class="si">{}</span><span class="">&amp;ll=</span><span class="si">{}</span><span class="">,</span><span class="si">{}</span><span class="">&amp;radius=</span><span class="si">{}</span><span class="">&amp;limit=</span><span class="si">{}</span><span class="">&#39;</span><span class="o">.</span><span class="n">format</span><span class="p">(</span>
        <br/>
            <span class="n">            CLIENT_ID</span><span class="p">,</span> 
            <br/>
            <span class="n">            CLIENT_SECRET</span><span class="p">,</span> 
            <br/>
            <span class="n">            VERSION</span><span class="p">,</span> 
            <br/>
            <span class="n">            lat</span><span class="p">,</span> 
            <br/>
            <span class="n">            lng</span><span class="p">,</span> 
            <br/>
            <span class="n">            radius</span><span class="p">,</span>
            <br/> 
            <span class="n">            LIMIT</span><span class="p">)</span>
        <br/>
        <span class="c1">           # make the GET request</span>
        <br/>
        <span class="n">       results</span> <span class="o">=</span> <span class="n">requests</span><span class="o">.</span><span class="n">get</span><span class="p">(</span><span class="n">url</span><span class="p">)</span><span class="o">.</span><span class="n">json</span><span class="p">()[</span><span class="s2">&quot;response&quot;</span><span class="p">][</span><span class="">&#39;groups&#39;</span><span class="p">][</span><span class="mi">0</span><span class="p">][</span><span class="">&#39;items&#39;</span><span class="p">]</span>
        <br/>
        <span class="c1">       # return only relevant information for each nearby venue</span>
        <br/>
        <span class="n">       venues_list</span><span class="o">.</span><span class="n">append</span><span class="p">([(</span>
        <br/>
            <span class="n">            name</span><span class="p">,</span> 
            <br/>
            <span class="n">            lat</span><span class="p">,</span> 
            <br/>
            <span class="n">            lng</span><span class="p">,</span> 
            <br/>
            <span class="n">            v</span><span class="p">[</span><span class="">&#39;venue&#39;</span><span class="p">][</span><span class="">&#39;name&#39;</span><span class="p">],</span> 
            <br/>
            <span class="n">            v</span><span class="p">[</span><span class="">&#39;venue&#39;</span><span class="p">][</span><span class="">&#39;location&#39;</span><span class="p">][</span><span class="">&#39;lat&#39;</span><span class="p">],</span> 
            <br/>
            <span class="n">            v</span><span class="p">[</span><span class="">&#39;venue&#39;</span><span class="p">][</span><span class="">&#39;location&#39;</span><span class="p">][</span><span class="">&#39;lng&#39;</span><span class="p">],</span>  
            <br/>
            <span class="n">            v</span><span class="p">[</span><span class="">&#39;venue&#39;</span><span class="p">][</span><span class="">&#39;categories&#39;</span><span class="p">][</span><span class="mi">0</span><span class="p">][</span><span class="">&#39;name&#39;</span><span class="p">])</span> <span class="k">for</span> <span class="n">v</span> <span class="ow">in</span> <span class="n">results</span><span class="p">])</span>
            <br/>
    <span class="n">    nearby_venues</span> <span class="o">=</span> <span class="n">pd</span><span class="o">.</span><span class="n">DataFrame</span><span class="p">([</span><span class="n">item</span> <span class="k">for</span> <span class="n">venue_list</span> <span class="ow">in</span> <span class="n">venues_list</span> <span class="k">for</span> <span class="n">item</span> <span class="ow">in</span> <span class="n">venue_list</span><span class="p">])</span>
    <br/>
    <span class="n">    nearby_venues</span><span class="o">.</span><span class="n">columns</span> <span class="o">=</span> <span class="p">[</span><span class="">&#39;Neighborhood&#39;</span><span class="p">,</span> 
                  <br/>
                  <span class="">             &#39;Neighborhood Latitude&#39;</span><span class="p">,</span> 
                  <br/>
                  <span class="">             &#39;Neighborhood Longitude&#39;</span><span class="p">,</span> 
                  <br/>
                  <span class="">             &#39;Venue&#39;</span><span class="p">,</span> 
                  <br/>
                  <span class="">             &#39;Venue Latitude&#39;</span><span class="p">,</span> 
                  <br/>
                  <span class="">             &#39;Venue Longitude&#39;</span><span class="p">,</span> 
                  <br/>
                  <span class="">             &#39;Venue Category&#39;</span><span class="p">]</span>
    <br/>
    <span class="k">    return</span><span class="p">(</span><span class="n">nearby_venues</span><span class="p">)</span>
</pre></div>

    </div>
</div>
</div>

</div>
<br/>
<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div><div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<p>Now write the code to run the above function on each neighborhood and create a new dataframe called _northyorkanvenues.</p>
</div>
</div>
</div>

<br/>

<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[20]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span><span class="c1"># ...</span>
<br/>
<span class="n">northY_venues</span> <span class="o">=</span> <span class="n">getNearbyVenues</span><span class="p">(</span><span class="n">names</span><span class="o">=</span><span class="n">northY_data</span><span class="p">[</span><span class="">&#39;Neighborhood&#39;</span><span class="p">],</span>
                                   <br/>
                                   <span class="n">                               latitudes</span><span class="o">=</span><span class="n">northY_data</span><span class="p">[</span><span class="">&#39;Latitude&#39;</span><span class="p">],</span>
                                   <br/>
                                   <span class="n">                               longitudes</span><span class="o">=</span><span class="n">northY_data</span><span class="p">[</span><span class="">&#39;Longitude&#39;</span><span class="p">]</span>
                                  <br/>
                                  <span class="p">                               )</span>
</pre></div>

    </div>
</div>
</div>
</div>

<br/>
<div class="output_wrapper">
<div class="output">


<div class="output_area">

    <div class="prompt"></div>


<div class="output_subarea output_stream output_stdout output_text">
<pre>Parkwoods<br/>
Victoria Village<br/>
Lawrence Manor, Lawrence Heights<br/>
Don Mills North<br/>
Glencairn<br/>
Don Mills South<br/>
Hillcrest Village<br/>
Bathurst Manor, Wilson Heights, Downsview North<br/>
Fairview, Henry Farm, Oriole<br/>
Northwood Park, York University<br/>
Bayview Village<br/>
Downsview East<br/>
York Mills, Silver Hills<br/>
Downsview West<br/>
North Park, Maple Leaf Park, Upwood Park<br/>
Humber Summit<br/>
Willowdale, Newtonbrook<br/>
Downsview Central<br/>
Bedford Park, Lawrence Manor East<br/>
Humberlea, Emery<br/>
Willowdale South<br/>
Downsview Northwest<br/>
York Mills West<br/>
Willowdale West<br/>
</pre>
</div>
</div>

</div>
</div>

<br/>

<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div><div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<strong>Analyze Each Neighborhood</strong>
<br/>
<p>
Let's print each neighborhood along with the top 5 most common venues

</p>
</div>
</div>
</div>

<br/>


<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[21]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span><span class="c1"># one hot encoding</span>
<br/>
<span class="n">northY_onehot</span> <span class="o">=</span> <span class="n">pd</span><span class="o">.</span><span class="n">get_dummies</span><span class="p">(</span><span class="n">northY_venues</span><span class="p">[[</span><span class="">&#39;Venue Category&#39;</span><span class="p">]],</span> <span class="n">prefix</span><span class="o">=</span><span class="s2">&quot;&quot;</span><span class="p">,</span> <span class="n">prefix_sep</span><span class="o">=</span><span class="s2">&quot;&quot;</span><span class="p">)</span>
<br/><br/>
<span class="c1"># add neighborhood column back to dataframe</span>
<br/>
<span class="n">northY_onehot</span><span class="p">[</span><span class="">&#39;Neighborhood&#39;</span><span class="p">]</span> <span class="o">=</span> <span class="n">northY_venues</span><span class="p">[</span><span class="">&#39;Neighborhood&#39;</span><span class="p">]</span> 
<br/><br/>
<span class="c1"># move neighborhood column to the first column</span>
<br/>
<span class="n">fixed_columns</span> <span class="o">=</span> <span class="p">[</span><span class="n">northY_onehot</span><span class="o">.</span><span class="n">columns</span><span class="p">[</span><span class="o">-</span><span class="mi">1</span><span class="p">]]</span> <span class="o">+</span> <span class="nb">list</span><span class="p">(</span><span class="n">northY_onehot</span><span class="o">.</span><span class="n">columns</span><span class="p">[:</span><span class="o">-</span><span class="mi">1</span><span class="p">])</span>
<br/>
<span class="n">northY_onehot</span> <span class="o">=</span> <span class="n">northY_onehot</span><span class="p">[</span><span class="n">fixed_columns</span><span class="p">]</span>
<br/><br/>
<span class="n">northY_onehot</span><span class="o">.</span><span class="n">head</span><span class="p">()</span>
</pre></div>

    </div>
</div>
</div>
</div>

<br/>
<div class="output_wrapper">
<div class="output">


<div class="output_area">

    <div class="prompt output_prompt">Out[6]:</div>



<div class="output_html rendered_html output_subarea output_execute_result">
<div>

<table border="1" class="table">
  <thead class="table-dark">
    <tr >
      <th></th>
      <th>Neighborhood</th>
      <th>Accessories Store</th>
      <th>Airport</th>
      <th>American Restaurant</th>
      <th>Art Gallery</th>
      <th>Arts &amp; Crafts Store</th>
      <th>Asian Restaurant</th>
      <th>Athletics &amp; Sports</th>
      <th>Bakery</th>
      <th>Bank</th>
      <th>...</th>
      <th>Steakhouse</th>
      <th>Supermarket</th>
      <th>Sushi Restaurant</th>
      <th>Thai Restaurant</th>
      <th>Theater</th>
      <th>Toy / Game Store</th>
      <th>Trail</th>
      <th>Video Game Store</th>
      <th>Vietnamese Restaurant</th>
      <th>Women's Store</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>Parkwoods</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>...</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
    </tr>
    <tr>
      <th>1</th>
      <td>Parkwoods</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>...</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
    </tr>
    <tr>
      <th>2</th>
      <td>Parkwoods</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>...</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
    </tr>
    <tr>
      <th>3</th>
      <td>Parkwoods</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>...</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
    </tr>
    <tr>
      <th>4</th>
      <td>Victoria Village</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>...</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
    </tr>
  </tbody>
</table>
<p>5 rows × 100 columns</p>
</div>
</div>

</div>

</div>
</div>
<br/>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[22]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span><span class="n">northY_grouped</span> <span class="o">=</span> <span class="n">northY_onehot</span><span class="o">.</span><span class="n">groupby</span><span class="p">(</span><span class="">&#39;Neighborhood&#39;</span><span class="p">)</span><span class="o">.</span><span class="n">mean</span><span class="p">()</span><span class="o">.</span><span class="n">reset_index</span><span class="p">()</span>
</pre></div>

    </div>
</div>
</div>
</div>
<br/>

<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[23]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span><span class="n">num_top_venues</span> <span class="o">=</span> <span class="mi">5</span>
<br/>
<span class="k">for</span> <span class="n">hood</span> <span class="ow">in</span> <span class="n">northY_grouped</span><span class="p">[</span><span class="">&#39;Neighborhood&#39;</span><span class="p">]:</span>
<br/>
    <span class="nb">    print</span><span class="p">(</span><span class="s2">&quot;----&quot;</span><span class="o">+</span><span class="n">hood</span><span class="o">+</span><span class="s2">&quot;----&quot;</span><span class="p">)</span>
    <br/>
    <span class="n">    temp</span> <span class="o">=</span> <span class="n">northY_grouped</span><span class="p">[</span><span class="n">northY_grouped</span><span class="p">[</span><span class="">&#39;Neighborhood&#39;</span><span class="p">]</span> <span class="o">==</span> <span class="n">hood</span><span class="p">]</span><span class="o">.</span><span class="n">T</span><span class="o">.</span><span class="n">reset_index</span><span class="p">()</span>
    <br/>
    <span class="n">    temp</span><span class="o">.</span><span class="n">columns</span> <span class="o">=</span> <span class="p">[</span><span class="">&#39;venue&#39;</span><span class="p">,</span><span class="">&#39;freq&#39;</span><span class="p">]</span>
    <br/>
    <span class="n">    temp</span> <span class="o">=</span> <span class="n">temp</span><span class="o">.</span><span class="n">iloc</span><span class="p">[</span><span class="mi">1</span><span class="p">:]</span>
    <br/>
    <span class="n">    temp</span><span class="p">[</span><span class="">&#39;freq&#39;</span><span class="p">]</span> <span class="o">=</span> <span class="n">temp</span><span class="p">[</span><span class="">&#39;freq&#39;</span><span class="p">]</span><span class="o">.</span><span class="n">astype</span><span class="p">(</span><span class="nb">float</span><span class="p">)</span>
    <br/>
    <span class="n">    temp</span> <span class="o">=</span> <span class="n">temp</span><span class="o">.</span><span class="n">round</span><span class="p">(&#123;</span><span class="">&#39;freq&#39;</span><span class="p">:</span> <span class="mi">2</span><span class="p">&#125;)</span>
    <br/>
    <span class="nb">    print</span><span class="p">(</span><span class="n">temp</span><span class="o">.</span><span class="n">sort_values</span><span class="p">(</span><span class="">&#39;freq&#39;</span><span class="p">,</span> <span class="n">ascending</span><span class="o">=</span><span class="kc">False</span><span class="p">)</span><span class="o">.</span><span class="n">reset_index</span><span class="p">(</span><span class="n">drop</span><span class="o">=</span><span class="kc">True</span><span class="p">)</span><span class="o">.</span><span class="n">head</span><span class="p">(</span><span class="n">num_top_venues</span><span class="p">))</span>
    <br/>
    <span class="nb">    print</span><span class="p">(</span><span class="">&#39;</span><span class="se">\n</span><span class="">&#39;</span><span class="p">)</span>
</pre></div>

    </div>
</div>
</div>
</div>

<br/>


<div class="output_wrapper">
<div class="output">


<div class="output_area">

    <div class="prompt output_prompt">Out[7]:</div>
    

<div class="output_subarea output_stream output_stdout output_text">
<pre>
    ----Bathurst Manor, Wilson Heights, Downsview North----<br/>                 venue  freq<br/>0          Coffee Shop  0.10<br/>1                 Bank  0.10<br/>2  Fried Chicken Joint  0.05<br/>3                Diner  0.05<br/>4             Pharmacy  0.05<br/><br/><br/>----Bayview Village----<br/>                 venue  freq<br/>0   Chinese Restaurant  0.25<br/>1                 Café  0.25<br/>2                 Bank  0.25<br/>3  Japanese Restaurant  0.25<br/>4    Accessories Store  0.00<br/><br/><br/>----Bedford Park, Lawrence Manor East----<br/>                venue  freq<br/>0         Coffee Shop  0.07<br/>1  Italian Restaurant  0.07<br/>2      Sandwich Place  0.07<br/>3         Pizza Place  0.07<br/>4    Greek Restaurant  0.04<br/><br/><br/>----Don Mills North----<br/>                  venue  freq<br/>0                   Gym  0.25<br/>1  Caribbean Restaurant  0.25<br/>2                  Café  0.25<br/>3   Japanese Restaurant  0.25<br/>4     Accessories Store  0.00<br/><br/><br/>----Don Mills South----<br/>                venue  freq<br/>0         Coffee Shop  0.10<br/>1                 Gym  0.10<br/>2          Restaurant  0.10<br/>3  Chinese Restaurant  0.05<br/>4      Clothing Store  0.05<br/><br/><br/>----Downsview Central----<br/>               venue  freq<br/>0         Food Truck   0.5<br/>1     Baseball Field   0.5<br/>2  Accessories Store   0.0<br/>3          Juice Bar   0.0<br/>4      Movie Theater   0.0<br/><br/><br/>----Downsview East----<br/>              venue  freq<br/>0           Airport  0.33<br/>1  Business Service  0.33<br/>2              Park  0.33<br/>3               Gym  0.00<br/>4        Hobby Shop  0.00<br/><br/><br/>----Downsview Northwest----<br/>                venue  freq<br/>0       Grocery Store  0.25<br/>1  Athletics &amp; Sports  0.25<br/>2      Discount Store  0.25<br/>3         Coffee Shop  0.25<br/>4        Hockey Arena  0.00<br/><br/><br/>----Downsview West----<br/>           venue  freq<br/>0           Park   0.2<br/>1  Grocery Store   0.2<br/>2          Hotel   0.2<br/>3           Bank   0.2<br/>4  Shopping Mall   0.2<br/><br/><br/>----Fairview, Henry Farm, Oriole----<br/>                  venue  freq<br/>0        Clothing Store  0.12<br/>1           Coffee Shop  0.08<br/>2  Fast Food Restaurant  0.06<br/>3         Women&#39;s Store  0.03<br/>4      Toy / Game Store  0.03<br/><br/><br/>----Glencairn----<br/>                 venue  freq<br/>0   Italian Restaurant  0.50<br/>1  Japanese Restaurant  0.25<br/>2               Bakery  0.25<br/>3            Juice Bar  0.00<br/>4        Movie Theater  0.00<br/><br/><br/>----Hillcrest Village----<br/>                      venue  freq<br/>0               Golf Course   0.2<br/>1      Fast Food Restaurant   0.2<br/>2  Mediterranean Restaurant   0.2<br/>3                      Pool   0.2<br/>4                   Dog Run   0.2<br/><br/><br/>----Humber Summit----<br/>                       venue  freq<br/>0                Pizza Place   1.0<br/>1          Accessories Store   0.0<br/>2                  Juice Bar   0.0<br/>3              Movie Theater   0.0<br/>4  Middle Eastern Restaurant   0.0<br/><br/><br/>----Humberlea, Emery----<br/>                       venue  freq<br/>0             Baseball Field   1.0<br/>1          Accessories Store   0.0<br/>2              Jewelry Store   0.0<br/>3              Movie Theater   0.0<br/>4  Middle Eastern Restaurant   0.0<br/><br/><br/>----Lawrence Manor, Lawrence Heights----<br/>                    venue  freq<br/>0          Clothing Store  0.42<br/>1       Accessories Store  0.08<br/>2                Boutique  0.08<br/>3   Vietnamese Restaurant  0.08<br/>4  Furniture / Home Store  0.08<br/><br/><br/>----North Park, Maple Leaf Park, Upwood Park----<br/>                        venue  freq<br/>0                        Park  0.25<br/>1  Construction &amp; Landscaping  0.25<br/>2                       Trail  0.25<br/>3                      Bakery  0.25<br/>4                   Juice Bar  0.00<br/><br/><br/>----Northwood Park, York University----<br/>                    venue  freq<br/>0  Furniture / Home Store  0.33<br/>1    Caribbean Restaurant  0.17<br/>2          Massage Studio  0.17<br/>3                     Bar  0.17<br/>4             Coffee Shop  0.17<br/><br/><br/>----Parkwoods----<br/>                        venue  freq<br/>0  Construction &amp; Landscaping  0.25<br/>1           Food &amp; Drink Shop  0.25<br/>2        Fast Food Restaurant  0.25<br/>3                        Park  0.25<br/>4           Accessories Store  0.00<br/><br/><br/>----Victoria Village----<br/>                   venue  freq<br/>0            Coffee Shop   0.2<br/>1            Pizza Place   0.2<br/>2           Hockey Arena   0.2<br/>3  Portuguese Restaurant   0.2<br/>4           Intersection   0.2<br/><br/><br/>----Willowdale South----<br/>              venue  freq<br/>0  Ramen Restaurant  0.09<br/>1  Sushi Restaurant  0.06<br/>2              Café  0.06<br/>3       Pizza Place  0.06<br/>4       Coffee Shop  0.06<br/><br/><br/>----Willowdale West----<br/>            venue  freq<br/>0        Pharmacy  0.14<br/>1     Supermarket  0.14<br/>2  Discount Store  0.14<br/>3     Coffee Shop  0.14<br/>4     Pizza Place  0.14<br/><br/><br/>----Willowdale, Newtonbrook----<br/>                       venue  freq<br/>0                       Park   1.0<br/>1                  Pet Store   0.0<br/>2              Movie Theater   0.0<br/>3  Middle Eastern Restaurant   0.0<br/>4   Mediterranean Restaurant   0.0<br/><br/><br/>----York Mills West----<br/>                       venue  freq<br/>0                       Park   0.5<br/>1          Convenience Store   0.5<br/>2                  Juice Bar   0.0<br/>3              Movie Theater   0.0<br/>4  Middle Eastern Restaurant   0.0<br/><br/><br/>----York Mills, Silver Hills----<br/>                 venue  freq<br/>0            Cafeteria   0.5<br/>1  Martial Arts School   0.5<br/>2    Accessories Store   0.0<br/>3            Juice Bar   0.0<br/>4        Movie Theater   0.0<br/>
</pre>
</div>
</div>

</div>
</div>

<br/>
<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div><div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<strong>Let's put that into a pandas dataframe</strong>
<br/>
<p>
First, let's write a function to sort the venues in descending order.

</p>
</div>
</div>
</div>

<br/>


<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[24]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span><span class="k">def</span> <span class="nf">return_most_common_venues</span><span class="p">(</span><span class="n">row</span><span class="p">,</span> <span class="n">num_top_venues</span><span class="p">):</span>
    <br/>
    <span class="n">    row_categories</span> <span class="o">=</span> <span class="n">row</span><span class="o">.</span><span class="n">iloc</span><span class="p">[</span><span class="mi">1</span><span class="p">:]</span>
    <br/>
    <span class="n">    row_categories_sorted</span> <span class="o">=</span> <span class="n">row_categories</span><span class="o">.</span><span class="n">sort_values</span><span class="p">(</span><span class="n">ascending</span><span class="o">=</span><span class="kc">False</span><span class="p">)</span>
    <br/>
    <span class="k">    return</span> <span class="n">row_categories_sorted</span><span class="o">.</span><span class="n">index</span><span class="o">.</span><span class="n">values</span><span class="p">[</span><span class="mi">0</span><span class="p">:</span><span class="n">num_top_venues</span><span class="p">]</span>
</pre></div>

    </div>
</div>
</div>

</div>

<br/>
<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div><div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">

<p>
Now let's create the new dataframe and display the top 10 venues for each neighborhood.
</p>
</div>
</div>
</div>

<br/>

<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[25]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span><span class="n">num_top_venues</span> <span class="o">=</span> <span class="mi">10</span>
<br/>
<span class="n">indicators</span> <span class="o">=</span> <span class="p">[</span><span class="">&#39;st&#39;</span><span class="p">,</span> <span class="">&#39;nd&#39;</span><span class="p">,</span> <span class="">&#39;rd&#39;</span><span class="p">]</span>
<br/>
<span class="c1"># create columns according to number of top venues</span>
<br/>
<span class="n">columns</span> <span class="o">=</span> <span class="p">[</span><span class="">&#39;Neighborhood&#39;</span><span class="p">]</span>
<br/>
<span class="k">for</span> <span class="n">ind</span> <span class="ow">in</span> <span class="n">np</span><span class="o">.</span><span class="n">arange</span><span class="p">(</span><span class="n">num_top_venues</span><span class="p">):</span>
<br/>
    <span class="k">    try</span><span class="p">:</span>
    <br/>
        <span class="n">        columns</span><span class="o">.</span><span class="n">append</span><span class="p">(</span><span class="">&#39;</span><span class="si">{}{}</span><span class=""> Most Common Venue&#39;</span><span class="o">.</span><span class="n">format</span><span class="p">(</span><span class="n">ind</span><span class="o">+</span><span class="mi">1</span><span class="p">,</span> <span class="n">indicators</span><span class="p">[</span><span class="n">ind</span><span class="p">]))</span>
        <br/>
    <span class="k">    except</span><span class="p">:</span>
    <br/>
        <span class="n">        columns</span><span class="o">.</span><span class="n">append</span><span class="p">(</span><span class="">&#39;</span><span class="si">{}</span><span class="">th Most Common Venue&#39;</span><span class="o">.</span><span class="n">format</span><span class="p">(</span><span class="n">ind</span><span class="o">+</span><span class="mi">1</span><span class="p">))</span>
        <br/>
<span class="c1"># create a new dataframe</span>
<br/>
<span class="n">neighborhoods_venues_sorted</span> <span class="o">=</span> <span class="n">pd</span><span class="o">.</span><span class="n">DataFrame</span><span class="p">(</span><span class="n">columns</span><span class="o">=</span><span class="n">columns</span><span class="p">)</span>
<br/>
<span class="n">neighborhoods_venues_sorted</span><span class="p">[</span><span class="">&#39;Neighborhood&#39;</span><span class="p">]</span> <span class="o">=</span> <span class="n">northY_grouped</span><span class="p">[</span><span class="">&#39;Neighborhood&#39;</span><span class="p">]</span>
<br/>
<span class="k">for</span> <span class="n">ind</span> <span class="ow">in</span> <span class="n">np</span><span class="o">.</span><span class="n">arange</span><span class="p">(</span><span class="n">northY_grouped</span><span class="o">.</span><span class="n">shape</span><span class="p">[</span><span class="mi">0</span><span class="p">]):</span>
<br/>
    <span class="n">    neighborhoods_venues_sorted</span><span class="o">.</span><span class="n">iloc</span><span class="p">[</span><span class="n">ind</span><span class="p">,</span> <span class="mi">1</span><span class="p">:]</span> <span class="o">=</span> <span class="n">return_most_common_venues</span><span class="p">(</span><span class="n">northY_grouped</span><span class="o">.</span><span class="n">iloc</span><span class="p">[</span><span class="n">ind</span><span class="p">,</span> <span class="p">:],</span> <span class="n">num_top_venues</span><span class="p">)</span>
    <br/>
<span class="n">neighborhoods_venues_sorted</span><span class="o">.</span><span class="n">head</span><span class="p">()</span>
</pre></div>

    </div>
</div>

</div>


</div>
<br/>
<div class="output_wrapper">
<div class="output">


<div class="output_area">

    <div class="prompt output_prompt">Out[8]:</div>



<div class="output_html rendered_html output_subarea output_execute_result">
<div>

<table border="1" class="table">
  <thead class="table-dark">
    <tr >
      <th></th>
      <th>Neighborhood</th>
      <th>1st Most Common Venue</th>
      <th>2nd Most Common Venue</th>
      <th>3rd Most Common Venue</th>
      <th>4th Most Common Venue</th>
      <th>5th Most Common Venue</th>
      <th>6th Most Common Venue</th>
      <th>7th Most Common Venue</th>
      <th>8th Most Common Venue</th>
      <th>9th Most Common Venue</th>
      <th>10th Most Common Venue</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>Bathurst Manor, Wilson Heights, Downsview North</td>
      <td>Coffee Shop</td>
      <td>Bank</td>
      <td>Fried Chicken Joint</td>
      <td>Diner</td>
      <td>Pharmacy</td>
      <td>Pizza Place</td>
      <td>Chinese Restaurant</td>
      <td>Restaurant</td>
      <td>Sandwich Place</td>
      <td>Deli / Bodega</td>
    </tr>
    <tr>
      <th>1</th>
      <td>Bayview Village</td>
      <td>Chinese Restaurant</td>
      <td>Café</td>
      <td>Bank</td>
      <td>Japanese Restaurant</td>
      <td>Accessories Store</td>
      <td>Liquor Store</td>
      <td>Park</td>
      <td>Movie Theater</td>
      <td>Middle Eastern Restaurant</td>
      <td>Mediterranean Restaurant</td>
    </tr>
    <tr>
      <th>2</th>
      <td>Bedford Park, Lawrence Manor East</td>
      <td>Coffee Shop</td>
      <td>Italian Restaurant</td>
      <td>Sandwich Place</td>
      <td>Pizza Place</td>
      <td>Greek Restaurant</td>
      <td>Juice Bar</td>
      <td>Liquor Store</td>
      <td>Café</td>
      <td>Pub</td>
      <td>Butcher</td>
    </tr>
    <tr>
      <th>3</th>
      <td>Don Mills North</td>
      <td>Gym</td>
      <td>Caribbean Restaurant</td>
      <td>Café</td>
      <td>Japanese Restaurant</td>
      <td>Accessories Store</td>
      <td>Liquor Store</td>
      <td>Park</td>
      <td>Movie Theater</td>
      <td>Middle Eastern Restaurant</td>
      <td>Mediterranean Restaurant</td>
    </tr>
    <tr>
      <th>4</th>
      <td>Don Mills South</td>
      <td>Coffee Shop</td>
      <td>Gym</td>
      <td>Restaurant</td>
      <td>Chinese Restaurant</td>
      <td>Clothing Store</td>
      <td>Sandwich Place</td>
      <td>Shopping Mall</td>
      <td>Dim Sum Restaurant</td>
      <td>Sporting Goods Shop</td>
      <td>Supermarket</td>
    </tr>
  </tbody>
</table>
</div>
</div>

</div>

</div>
</div>

<br/>

<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div><div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<h4>Cluster Neighborhoods</h4>
<br/>
<p>
We will run the k-means algorithm to cluster the neighborhood into 5 clusters.
</p>
</div>
</div>
</div>

<br/>

<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[26]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span><span class="c1"># set number of clusters</span><br/>
<span class="n">kclusters</span> <span class="o">=</span> <span class="mi">5</span>
<br/>
<span class="n">northY_grouped_clustering</span> <span class="o">=</span> <span class="n">northY_grouped</span><span class="o">.</span><span class="n">drop</span><span class="p">(</span><span class="">&#39;Neighborhood&#39;</span><span class="p">,</span> <span class="mi">1</span><span class="p">)</span>
<br/>
<span class="c1"># run k-means clustering</span>
<br/>
<span class="n">kmeans</span> <span class="o">=</span> <span class="n">KMeans</span><span class="p">(</span><span class="n">n_clusters</span><span class="o">=</span><span class="n">kclusters</span><span class="p">,</span> <span class="n">random_state</span><span class="o">=</span><span class="mi">0</span><span class="p">)</span><span class="o">.</span><span class="n">fit</span><span class="p">(</span><span class="n">northY_grouped_clustering</span><span class="p">)</span>
<br/>
<span class="c1"># check cluster labels generated for each row in the dataframe</span>
<br/>
<span class="n">kmeans</span><span class="o">.</span><span class="n">labels_</span><span class="p">[</span><span class="mi">0</span><span class="p">:</span><span class="mi">10</span><span class="p">]</span> 
</pre></div>

    </div>
</div>
</div>
</div>

<br/>
<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div><div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">

<p>
Let's create a new dataframe that includes the cluster as well as the top 10 venues for each neighborhood.


</p>
</div>
</div>
</div>

<br/>

<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[27]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span><span class="c1"># add clustering labels</span>
<br/>
<span class="n">neighborhoods_venues_sorted</span><span class="o">.</span><span class="n">insert</span><span class="p">(</span><span class="mi">0</span><span class="p">,</span> <span class="">&#39;Cluster Labels&#39;</span><span class="p">,</span> <span class="n">kmeans</span><span class="o">.</span><span class="n">labels_</span><span class="p">)</span>
<br/>
<br/>
<span class="n">northY_merged</span> <span class="o">=</span> <span class="n">northY_data</span>
<br/>
<br/>
<span class="c1"># merge manhattan_grouped with manhattan_data to add latitude/longitude for each neighborhood</span>
<br/>
<span class="n">northY_merged</span> <span class="o">=</span> <span class="n">northY_merged</span><span class="o">.</span><span class="n">join</span><span class="p">(</span><span class="n">neighborhoods_venues_sorted</span><span class="o">.</span><span class="n">set_index</span><span class="p">(</span><span class="">&#39;Neighborhood&#39;</span><span class="p">),</span> <span class="n">on</span><span class="o">=</span><span class="">&#39;Neighborhood&#39;</span><span class="p">)</span>
<br/>
<span class="n">northY_merged</span><span class="o">.</span><span class="n">head</span><span class="p">()</span> <span class="c1"># check the last columns!</span>
</pre></div>

    </div>
</div>
</div>
</div>

<br/>

<br/>
<div class="output_wrapper">
<div class="output">


<div class="output_area">

    <div class="prompt output_prompt">Out[9]:</div>



<div class="output_html rendered_html output_subarea output_execute_result">
<div>

<table border="1" class="table">
  <thead class="table-dark">
    <tr >
      <th></th>
      <th>Borough</th>
      <th>Neighborhood</th>
      <th>Latitude</th>
      <th>Longitude</th>
      <th>Cluster Labels</th>
      <th>1st Most Common Venue</th>
      <th>2nd Most Common Venue</th>
      <th>3rd Most Common Venue</th>
      <th>4th Most Common Venue</th>
      <th>5th Most Common Venue</th>
      <th>6th Most Common Venue</th>
      <th>7th Most Common Venue</th>
      <th>8th Most Common Venue</th>
      <th>9th Most Common Venue</th>
      <th>10th Most Common Venue</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>North York</td>
      <td>Parkwoods</td>
      <td>43.753259</td>
      <td>-79.329656</td>
      <td>0</td>
      <td>Construction &amp; Landscaping</td>
      <td>Food &amp; Drink Shop</td>
      <td>Fast Food Restaurant</td>
      <td>Park</td>
      <td>Accessories Store</td>
      <td>Juice Bar</td>
      <td>Middle Eastern Restaurant</td>
      <td>Mediterranean Restaurant</td>
      <td>Massage Studio</td>
      <td>Martial Arts School</td>
    </tr>
    <tr>
      <th>1</th>
      <td>North York</td>
      <td>Victoria Village</td>
      <td>43.725882</td>
      <td>-79.315572</td>
      <td>0</td>
      <td>Coffee Shop</td>
      <td>Pizza Place</td>
      <td>Hockey Arena</td>
      <td>Portuguese Restaurant</td>
      <td>Intersection</td>
      <td>Lingerie Store</td>
      <td>Movie Theater</td>
      <td>Middle Eastern Restaurant</td>
      <td>Mediterranean Restaurant</td>
      <td>Massage Studio</td>
    </tr>
    <tr>
      <th>2</th>
      <td>North York</td>
      <td>Lawrence Manor, Lawrence Heights</td>
      <td>43.718518</td>
      <td>-79.464763</td>
      <td>0</td>
      <td>Clothing Store</td>
      <td>Accessories Store</td>
      <td>Boutique</td>
      <td>Vietnamese Restaurant</td>
      <td>Furniture / Home Store</td>
      <td>Event Space</td>
      <td>Coffee Shop</td>
      <td>Gift Shop</td>
      <td>Bank</td>
      <td>Pizza Place</td>
    </tr>
    <tr>
      <th>3</th>
      <td>North York</td>
      <td>Don Mills North</td>
      <td>43.745906</td>
      <td>-79.352188</td>
      <td>0</td>
      <td>Gym</td>
      <td>Caribbean Restaurant</td>
      <td>Café</td>
      <td>Japanese Restaurant</td>
      <td>Accessories Store</td>
      <td>Liquor Store</td>
      <td>Park</td>
      <td>Movie Theater</td>
      <td>Middle Eastern Restaurant</td>
      <td>Mediterranean Restaurant</td>
    </tr>
    <tr>
      <th>4</th>
      <td>North York</td>
      <td>Glencairn</td>
      <td>43.709577</td>
      <td>-79.445073</td>
      <td>0</td>
      <td>Italian Restaurant</td>
      <td>Japanese Restaurant</td>
      <td>Bakery</td>
      <td>Juice Bar</td>
      <td>Movie Theater</td>
      <td>Middle Eastern Restaurant</td>
      <td>Mediterranean Restaurant</td>
      <td>Massage Studio</td>
      <td>Martial Arts School</td>
      <td>Luggage Store</td>
    </tr>
  </tbody>
</table>
</div>
</div>

</div>

</div>
</div>

<br/>

<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div><div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">

<p>
Finally, let's visualize the resulting clusters

</p>
</div>
</div>
</div>

<br/>

<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[28]:</div>
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre>
<span class="c1"># create map</span>
<br/>
<span class="n">map_clusters</span> <span class="o">=</span> <span class="n">folium</span><span class="o">.</span><span class="n">Map</span><span class="p">(</span><span class="n">location</span><span class="o">=</span><span class="p">[</span><span class="mf">43.753259</span><span class="p">,</span> <span class="o">-</span><span class="mf">79.329656</span><span class="p">],</span> <span class="n">zoom_start</span><span class="o">=</span><span class="mi">11</span><span class="p">)</span>
<br/>
<span class="c1"># set color scheme for the clusters</span>
<br/>
<span class="n">x</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">arange</span><span class="p">(</span><span class="n">kclusters</span><span class="p">)</span>
<br/>
<span class="n">ys</span> <span class="o">=</span> <span class="p">[</span><span class="n">i</span> <span class="o">+</span> <span class="n">x</span> <span class="o">+</span> <span class="p">(</span><span class="n">i</span><span class="o">*</span><span class="n">x</span><span class="p">)</span><span class="o">**</span><span class="mi">2</span> <span class="k">for</span> <span class="n">i</span> <span class="ow">in</span> <span class="nb">range</span><span class="p">(</span><span class="n">kclusters</span><span class="p">)]</span>
<br/>
<span class="n">colors_array</span> <span class="o">=</span> <span class="n">cm</span><span class="o">.</span><span class="n">rainbow</span><span class="p">(</span><span class="n">np</span><span class="o">.</span><span class="n">linspace</span><span class="p">(</span><span class="mi">0</span><span class="p">,</span> <span class="mi">1</span><span class="p">,</span> <span class="nb">len</span><span class="p">(</span><span class="n">ys</span><span class="p">)))</span>
<br/>
<span class="n">rainbow</span> <span class="o">=</span> <span class="p">[</span><span class="n">colors</span><span class="o">.</span><span class="n">rgb2hex</span><span class="p">(</span><span class="n">i</span><span class="p">)</span> <span class="k">for</span> <span class="n">i</span> <span class="ow">in</span> <span class="n">colors_array</span><span class="p">]</span>
<br/>
<span class="c1"># add markers to the map</span>
<br/>
<span class="n">markers_colors</span> <span class="o">=</span> <span class="p">[]</span>
<br/>
<span class="k">for</span> <span class="n">lat</span><span class="p">,</span> <span class="n">lon</span><span class="p">,</span> <span class="n">poi</span><span class="p">,</span> <span class="n">cluster</span> <span class="ow">in</span> <span class="nb">zip</span><span class="p">(</span><span class="n">northY_merged</span><span class="p">[</span><span class="">&#39;Latitude&#39;</span><span class="p">],</span> <span class="n">northY_merged</span><span class="p">[</span><span class="">&#39;Longitude&#39;</span><span class="p">],</span> <span class="n">northY_merged</span><span class="p">[</span><span class="">&#39;Neighborhood&#39;</span><span class="p">],</span> <span class="n">northY_merged</span><span class="p">[</span><span class="">&#39;Cluster Labels&#39;</span><span class="p">]):</span>
<br/>
    <span class="n">    label</span> <span class="o">=</span> <span class="n">folium</span><span class="o">.</span><span class="n">Popup</span><span class="p">(</span><span class="nb">str</span><span class="p">(</span><span class="n">poi</span><span class="p">)</span> <span class="o">+</span> <span class="">&#39; Cluster &#39;</span> <span class="o">+</span> <span class="nb">str</span><span class="p">(</span><span class="n">cluster</span><span class="p">),</span> <span class="n">parse_html</span><span class="o">=</span><span class="kc">True</span><span class="p">)</span>
    <br/>
    <span class="n">    folium</span><span class="o">.</span><span class="n">CircleMarker</span><span class="p">(</span>
        <br/>
        <span class="p">    [</span><span class="n">lat</span><span class="p">,</span> <span class="n">lon</span><span class="p">],</span>
        <br/>
        <span class="n">    radius</span><span class="o">=</span><span class="mi">5</span><span class="p">,</span>
        <br/>
        <span class="n">    popup</span><span class="o">=</span><span class="n">label</span><span class="p">,</span>
        <br/>
        <span class="n">    color</span><span class="o">=</span><span class="n">rainbow</span><span class="p">[</span><span class="n">cluster</span><span class="o">-</span><span class="mi">1</span><span class="p">],</span>
        <br/>
        <span class="n">    fill</span><span class="o">=</span><span class="kc">True</span><span class="p">,</span>
        <br/>
        <span class="n">    fill_color</span><span class="o">=</span><span class="n">rainbow</span><span class="p">[</span><span class="n">cluster</span><span class="o">-</span><span class="mi">1</span><span class="p">],</span>
        <br/>
        <span class="n">    fill_opacity</span><span class="o">=</span><span class="mf">0.7</span><span class="p">)</span><span class="o">.</span><span class="n">add_to</span><span class="p">(</span><span class="n">map_clusters</span><span class="p">)</span>
       <br/>
<span class="n">map_clusters</span>
</pre></div>

    </div>
</div>
</div>
</div>


<br/>

<div class="output_wrapper">
<div class="output">


<div class="output_area">

    <div class="prompt output_prompt">Out[10]:</div>



<div class="output_html rendered_html output_subarea output_execute_result">

<img src={can_after_clustering}/>
</div>

</div>
</div>
</div>
<br/>
<br/>

<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div><div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<h3><strong id="Thank-you-for-completing-this-lab!">Thank you for reading !</strong></h3><p><br/><a href="https://github.com/AhmedZIANE/Coursera_Capstone/blob/master/Segmenting%20and%20Clustering%20Neighborhoods%20in%20Toronto.ipynb">View the project on github<span>  </span></a><i class="fab fa-github"></i></p>
</div>
</div>
</div>











<br/>
</div>
    </div>
    </React.StrictMode>
  );
}

export default Clustering;
