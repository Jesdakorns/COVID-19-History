import {
  Box,
  Container,
  Grid,
  Tab,
  Tabs,
  Typography,
  styled,
  IconButton,
  Tooltip,
  Alert,
  Snackbar,
} from "@mui/material";
import CardCase from "../components/CardCase";
import { FormProvider, useForm } from "react-hook-form";
import { IHistoricalAll, IWorldwideAll } from "../api/response";
import Chart from "../components/Chart";
import Table from "../components/Table";
import { TabContext, TabPanel } from "@mui/lab";
import DatePickerForm from "../components/DatePicker";
import useTab from "../hook/useTab";
import useConvertData, { IChart, ITable } from "@/hook/useConvertData";
import useFetchData from "@/hook/useFetchDate";
import RefreshIcon from "@mui/icons-material/Refresh";

export interface IForm {
  covitWorldwide?: IWorldwideAll;
  dataChart?: { infected: IChart[]; recovered: IChart[]; deaths: IChart[] };
  dateInput: string;
  dataTable: ITable[];
  dataCovitHistoricalAll?: IHistoricalAll;
  loadingChart: boolean;
}

const Home = () => {
  const methodsForm = useForm<IForm>({
    mode: "onChange",
    defaultValues: {
      covitWorldwide: undefined,
      dateInput: "",
      dataTable: [],
      dataChart: {},
      dataCovitHistoricalAll: undefined,
      loadingChart: true,
    },
  });
  const { watch } = methodsForm;
  const loadingChart = watch("loadingChart");
  const { tab, handleChange } = useTab("1");
  const { covitWorldwide, fetchDataApiAll } = useFetchData({
    methodsForm,
  });
  useConvertData({ methodsForm });

  return (
    <Box>
      <FormProvider {...methodsForm}>
        <HeaderLogo>
          <Logo></Logo>
        </HeaderLogo>

        <Content>
          <Container fixed>
            <Grid container spacing={2}>
              <Grid item sx={{ width: { xs: "100%", md: "33.3%" } }}>
                <CardCase
                  title="Infected"
                  score={covitWorldwide?.cases}
                  bg="#71e3dc"
                  color={`#FFFF`}
                ></CardCase>
              </Grid>
              <Grid item sx={{ width: { xs: "50%", md: "33.3%" } }}>
                <CardCase
                  title="Recovered"
                  score={covitWorldwide?.recovered}
                  bg="#22a985"
                  color="#FFFF"
                ></CardCase>
              </Grid>
              <Grid item sx={{ width: { xs: "50%", md: "33.3%" } }}>
                <CardCase
                  title="Deaths"
                  score={covitWorldwide?.deaths}
                  bg="#fd7676"
                  color={`#FFFF`}
                ></CardCase>
              </Grid>
              <Grid item sx={{ width: "100%" }}>
                <Box
                  my={2}
                  sx={{
                    display: "flex",
                    alignItems: `center`,
                    justifyContent: `space-between`,
                  }}
                >
                  <Typography variant="h4" component="h2">
                    COVID-19 History
                  </Typography>
                  <Box>
                    <DatePickerForm
                      title={""}
                      name="dateInput"
                      placeholder="Date"
                      maxDate={new Date()}
                      views={["month", "year"]}
                    />
                  </Box>
                </Box>
                <TabContext value={tab}>
                  <Box
                    sx={{
                      borderBottom: 1,
                      borderColor: "divider",
                      display: `flex`,
                      justifyContent: `space-between`,
                    }}
                  >
                    <Tabs
                      value={tab}
                      onChange={handleChange}
                      aria-label="secondary tabs example"
                    >
                      <Tab label="Chart" value="1" />
                      <Tab label="Table" value="2" />
                    </Tabs>
                    <Tooltip title="Refresh Data">
                      <IconButton
                        disabled={loadingChart}
                        aria-label="delete"
                        size="large"
                        onClick={() => {
                          fetchDataApiAll("historical");
                        }}
                      >
                        <RefreshIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                  <TabPanel sx={{ p: 0, py: 3 }} value="1">
                    <Chart />
                  </TabPanel>
                  <TabPanel sx={{ p: 0, py: 3 }} value="2">
                    <Table />
                  </TabPanel>
                </TabContext>
              </Grid>
            </Grid>
          </Container>
        </Content>
      </FormProvider>
    </Box>
  );
};

export default Home;

const Logo = styled(Box)(() => ({
  width: "100%",
  height: "345px",
  background: `url(/img/medicine.svg)`,
  backgroundPosition: `bottom`,
  backgroundRepeat: `no-repeat`,
  backgroundSize: `contain`,
}));
const HeaderLogo = styled(Box)(() => ({
  width: "100%",
  height: "450px",
  minHeight: `450px`,
  background: `#50ddd4`,
  backgroundPosition: `center`,
  backgroundRepeat: `no-repeat`,
  backgroundSize: `cover`,
}));
const Content = styled(Box)(() => ({
  marginTop: "-100px",
  width: "100%",
  minHeight: "100px",
  background: "#fff",
  borderRadius: `50px 50px 0 0 `,
  padding: "40px 20px",
}));
