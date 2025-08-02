---
title: Motor Third Party Claims
tags:
  - Research
  - Actuarial
date:
  - 2025-07-31
image: /Resources/tech.jpg
draft: "true"
---
This paper or article is based out of [French Third Party Claims Case study](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3164764), an associative research pioneered by Swiss Association of actuaries.

The dataset used by them can be obtained from [OpenML](https://www.openml.org/search?type=data&sort=runs&id=41214&status=active), this can be directly taken using the following python script:

```python
from sklearn.datasets import fetch_openml
freq = fetch_openml(data_id=41214, as_frame=True).frame
```

There are about 678,013 individual car insurance policies, in this dataset.
The following are the columns in the dataset:

- Id Number, Claim Number, Exposure, Area, Vehicle Area, Vehicle Age, Driver Age, Bonus Malus, Vehicle Brand, Vehicle Gas, Density, Region.

The research started by getting info on how the each of the features are distributed in the dataset.
