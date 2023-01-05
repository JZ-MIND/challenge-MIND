import { shallow } from "enzyme";
import UsersPage from "../../components/Users/Users";

describe("Test Users Component", () => {
  it("Should render title screen", () => {
    const wrapper = shallow(<UsersPage />);

    expect(wrapper).toBeDefined();
  });
});
