import React from 'react';
import { Table } from 'react-bootstrap';

const SizeChartTable = () => {
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Ölçüm</th>
          <th>S</th>
          <th>M</th>
          <th>L</th>
          <th>XL</th>
          <th>XXL</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Boy (cm)</td>
          <td>72.5</td>
          <td>75.5</td>
          <td>77.5</td>
          <td>79.5</td>
          <td>81.5</td>
        </tr>
        <tr>
          <td>Göğüs (cm)</td>
          <td>61.5</td>
          <td>64.5</td>
          <td>67.5</td>
          <td>70.5</td>
          <td>73.5</td>
        </tr>
        <tr>
          <td>Etek Genişliği (cm)</td>
          <td>57</td>
          <td>60</td>
          <td>63</td>
          <td>66</td>
          <td>69</td>
        </tr>
        <tr>
          <td>Kol Boyu (cm)</td>
          <td>26.5</td>
          <td>27</td>
          <td>27.5</td>
          <td>28</td>
          <td>28.5</td>
        </tr>
        <tr>
          <td>Kol Genişliği (cm)</td>
          <td>25</td>
          <td>25.5</td>
          <td>26</td>
          <td>26.5</td>
          <td>27</td>
        </tr>
      </tbody>
    </Table> 
  );
};

export default SizeChartTable;
